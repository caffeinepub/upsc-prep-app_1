import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";



actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  type InternalUserProfile = {
    name : Text;
    email : Text;
    passwordHash : Text;
    principal : ?Principal;
  };

  type RegisterUserResult = {
    #ok;
    #emailTaken;
  };

  type UpdateUserNameResult = {
    #ok;
    #notFound;
  };

  stable var users = Map.empty<Text, InternalUserProfile>();

  // Public registration - anyone can register
  public shared ({ caller }) func registerUser(name : Text, email : Text, passwordHash : Text) : async RegisterUserResult {
    let normalizedEmail = email.toLower();

    switch (users.get(normalizedEmail)) {
      case (null) {
        let newUser : InternalUserProfile = {
          name;
          email = normalizedEmail;
          passwordHash;
          principal = null;
        };
        users.add(normalizedEmail, newUser);
        #ok;
      };
      case (?_existing) { #emailTaken };
    };
  };

  // Public query for authentication purposes - returns passwordHash for login verification
  // This is intentionally public as it's needed for the authentication flow
  public query ({ caller }) func getUserByEmail(email : Text) : async ?{
    name : Text;
    passwordHash : Text;
  } {
    users.get(email.toLower()).map(
      func(user) {
        {
          name = user.name;
          passwordHash = user.passwordHash;
        };
      }
    );
  };

  // Public update - anyone can update any user's name
  public shared ({ caller }) func updateUserName(email : Text, name : Text) : async UpdateUserNameResult {
    let normalizedEmail = email.toLower();
    switch (users.get(normalizedEmail)) {
      case (null) { #notFound };
      case (?user) {
        let updatedUser = {
          user with
          name;
        };
        users.add(normalizedEmail, updatedUser);
        #ok;
      };
    };
  };

  // Required profile management functions for the authorization system
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    
    // Find user by principal
    for ((email, user) in users.entries()) {
      switch (user.principal) {
        case (?p) {
          if (Principal.equal(p, caller)) {
            return ?{ name = user.name };
          };
        };
        case null {};
      };
    };
    null;
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    
    // Find user by principal
    for ((email, userProfile) in users.entries()) {
      switch (userProfile.principal) {
        case (?p) {
          if (Principal.equal(p, user)) {
            return ?{ name = userProfile.name };
          };
        };
        case null {};
      };
    };
    null;
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    
    // Find and update user by principal
    for ((email, user) in users.entries()) {
      switch (user.principal) {
        case (?p) {
          if (Principal.equal(p, caller)) {
            let updatedUser = {
              user with
              name = profile.name;
            };
            users.add(email, updatedUser);
            return;
          };
        };
        case null {};
      };
    };
    
    // If no user found with this principal, we can't create one without email
    Runtime.trap("No user account found for this principal");
  };
};

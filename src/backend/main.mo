import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type Subject = {
    #history;
    #geography;
    #polity;
    #economy;
    #scienceTech;
    #currentAffairs;
  };

  type SubjectProgress = {
    subject : Subject;
    completionPercentage : Nat;
  };

  type UserProfile = {
    displayName : Text;
    joinDate : Time.Time;
    studyStreak : Nat;
  };

  type DailyTarget = {
    id : Nat;
    description : Text;
    isCompleted : Bool;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let userStudyProgress = Map.empty<Principal, Map.Map<Nat, Nat>>();
  let dailyTargets = Map.empty<Principal, List.List<DailyTarget>>();
  var nextTargetId = 0;

  func subjectToNat(subject : Subject) : Nat {
    switch (subject) {
      case (#history) { 0 };
      case (#geography) { 1 };
      case (#polity) { 2 };
      case (#economy) { 3 };
      case (#scienceTech) { 4 };
      case (#currentAffairs) { 5 };
    };
  };

  func natToSubject(n : Nat) : Subject {
    switch (n) {
      case (0) { #history };
      case (1) { #geography };
      case (2) { #polity };
      case (3) { #economy };
      case (4) { #scienceTech };
      case (5) { #currentAffairs };
      case (_) { #history };
    };
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, {
      profile with
      joinDate = Time.now();
      studyStreak = 0;
    });
  };

  public query ({ caller }) func getCallerStudyProgress() : async [SubjectProgress] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can access study progress");
    };
    switch (userStudyProgress.get(caller)) {
      case (null) { [] };
      case (?subjects) {
        let allKeys = subjects.keys().toArray();
        allKeys.map(
          func(subject) {
            {
              subject = natToSubject(subject);
              completionPercentage = switch (subjects.get(subject)) {
                case (null) { 0 };
                case (?completion) { completion };
              };
            };
          }
        );
      };
    };
  };

  public shared ({ caller }) func updateStudyProgress(subject : Subject, completionPercentage : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can update study progress");
    };
    let progress = switch (userStudyProgress.get(caller)) {
      case (null) {
        Map.empty<Nat, Nat>();
      };
      case (?existing) {
        existing;
      };
    };

    let subjectKey = subjectToNat(subject);
    progress.add(subjectKey, completionPercentage);
    userStudyProgress.add(caller, progress);
  };

  public shared ({ caller }) func addDailyTarget(description : Text) : async Nat {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can add daily targets");
    };
    let target = {
      id = nextTargetId;
      description;
      isCompleted = false;
    };

    let targets = switch (dailyTargets.get(caller)) {
      case (null) {
        List.empty<DailyTarget>();
      };
      case (?existing) {
        existing;
      };
    };

    targets.add(target);
    dailyTargets.add(caller, targets);

    nextTargetId += 1;
    target.id;
  };

  public shared ({ caller }) func toggleTargetCompletion(targetId : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can toggle target completion");
    };
    switch (dailyTargets.get(caller)) {
      case (null) {
        Runtime.trap("No daily targets found for user");
      };
      case (?targets) {
        let updatedTargets = targets.map<DailyTarget, DailyTarget>(
          func(target) {
            if (target.id == targetId) {
              {
                id = target.id;
                description = target.description;
                isCompleted = not target.isCompleted;
              };
            } else {
              target;
            };
          }
        );
        dailyTargets.add(caller, updatedTargets);
      };
    };
  };

  public shared ({ caller }) func clearCompletedTargets() : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can clear completed targets");
    };
    switch (dailyTargets.get(caller)) {
      case (null) {
        Runtime.trap("No daily targets found for user");
      };
      case (?targets) {
        let filteredTargets = targets.filter(
          func(target) { not target.isCompleted }
        );
        dailyTargets.add(caller, filteredTargets);
      };
    };
  };

  public query ({ caller }) func getDailyTargets() : async [DailyTarget] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can access daily targets");
    };
    switch (dailyTargets.get(caller)) {
      case (null) { [] };
      case (?targets) { targets.toArray() };
    };
  };
};

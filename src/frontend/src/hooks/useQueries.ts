import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { DailyTarget, SubjectProgress, UserProfile } from "../backend.d";
import { useActor } from "./useActor";

export function useUserProfile() {
  const { actor, isFetching } = useActor();
  return useQuery<UserProfile | null>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useStudyProgress() {
  const { actor, isFetching } = useActor();
  return useQuery<SubjectProgress[]>({
    queryKey: ["studyProgress"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCallerStudyProgress();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDailyTargets() {
  const { actor, isFetching } = useActor();
  return useQuery<DailyTarget[]>({
    queryKey: ["dailyTargets"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getDailyTargets();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useToggleTarget() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (targetId: bigint) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.toggleTargetCompletion(targetId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dailyTargets"] });
    },
  });
}

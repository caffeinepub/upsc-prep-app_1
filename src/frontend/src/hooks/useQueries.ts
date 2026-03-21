import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UserProfile } from "../backend.d";
import type { DailyTarget, SubjectProgress } from "../types/local";
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
  // Study progress is managed via localStorage (syllabus tracker)
  return useQuery<SubjectProgress[]>({
    queryKey: ["studyProgress"],
    queryFn: async () => [],
    enabled: false,
  });
}

export function useDailyTargets() {
  // Daily targets are managed via localStorage (daily practice page)
  return useQuery<DailyTarget[]>({
    queryKey: ["dailyTargets"],
    queryFn: async () => [],
    enabled: false,
  });
}

export function useToggleTarget() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_targetId: bigint) => {
      // no-op: daily targets are managed via localStorage
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dailyTargets"] });
    },
  });
}

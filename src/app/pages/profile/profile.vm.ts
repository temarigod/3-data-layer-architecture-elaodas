export interface ProfileVM {
  profileDataIsLoading: boolean;
  profileDataError: boolean;
  profileData: {
    name: string;
    age: number;
    favoriteDogsCount: number;
    favoriteDogsCountChangeInProgress: boolean;
  } | null;
}

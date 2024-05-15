export interface UsersChartData {
  nbUsers: number;
  nbAds: number;
  nbFeaturedAds: number;
  nbUserAndAds: {
    month: string;
    nbUsers: number;
    nbAds: number;
  }[];
}
export interface AdsChartData {
  nbUsers: number;
  nbAds: number;
  nbFeaturedAds: number;
  nbUserAndAds: {
    month: string;
    nbUsers: number;
    nbAds: number;
  }[];
}
export interface WeekChartData {
  nbUsers: number;
  nbAds: number;
  nbFeaturedAds: number;
  nbUserAndAds: {
    day: string;
    nbUsers?: number;
    nbAds?: number;
  }[];
}

export interface NbUserAndAds {
  day: number;
  nbUsers?: number;
  nbAds?: number;
}
export interface MonthChartData {
  nbUsers: number;
  nbAds: number;
  nbFeaturedAds: number;
  nbUserAndAds: NbUserAndAds[];
}

export interface YearChartData {
  nbUsers: number;
  nbAds: number;
  nbFeaturedAds: number;
  nbUserAndAds: {
    month: string;
    nbUsers: number;
    nbAds: number;
  }[];
}

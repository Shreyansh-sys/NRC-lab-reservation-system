// src/utils/date.ts
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { LAB_TIMEZONE, LAB_TIMEZONE_DISPLAY } from '../constants/timezones';

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatLabTime = (dateString: string) => {
  return dayjs.utc(dateString).tz(LAB_TIMEZONE).format('h:mm A');
};

export const formatLabDate = (dateString: string) => {
  return dayjs.utc(dateString).tz(LAB_TIMEZONE).format('MMM D, YYYY');
};

export const getLabTimeRange = (startTime: string, endTime: string) => {
  return `${formatLabTime(startTime)} - ${formatLabTime(endTime)}`;
};

export const getLabTimezoneDisplay = () => LAB_TIMEZONE_DISPLAY;
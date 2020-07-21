/**
 * @author Parth Parmar <parth.parmar@dal.ca>
 *
 */

export interface ApiResponseModel {
  success: boolean;
  statusCode: number;
  items?: any;
  message?: string;
  error?: string;
}

import { ModifiedUser } from '../UserDetails';

export interface Category {
  id: number;
  name: string;
  description: string;
  is_exist: boolean;
  created_at: number;
  updated_at: number;
  created_by_id: number;
  created_by_type: string;
  created_by: ModifiedUser;
  updated_by_id: number | null;
  updated_by_type: null | string;
  updated_by: null | ModifiedUser;
}

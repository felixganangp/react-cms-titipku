import { ListParams } from './fetch';

export interface RequestKURParams extends ListParams {
  search?: string | undefined | null;
}

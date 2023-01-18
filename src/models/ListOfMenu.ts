export interface ListOfMenu {
    id: number;
    menu: string;
    created_at: number;
    is_exist: boolean;
    is_parent: boolean;
    parent_id: number;
    active_role: string;
    sub_menu: ListOfMenu[] | null;
}
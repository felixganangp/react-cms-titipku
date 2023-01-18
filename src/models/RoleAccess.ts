import AccessMenu from "./AccessMenu";

export default interface RoleAccess {
    name: string;
    description: string;
    account_type: string;
    controls: AccessMenu[];
}
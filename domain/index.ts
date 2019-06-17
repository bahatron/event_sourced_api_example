import $manager from "./manager";
import $repository from "./repository";

const $domain = {
    ...$manager,
    ...$repository
};

export default $domain;

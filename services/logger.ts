/**
 * @todo: create this as a NPM package
 */

import moment from "moment";

const $logger = {
    dump(...obj: any[]): void {
        let map = obj.map(element =>
            typeof element === "object" ? JSON.stringify(element, null, 2) : element
        );

        console.log(moment().format(), ...map);
    }
};

export default $logger;

import { expect } from "chai";

const $assertions = {
    /**
     * @param object object to test
     * @param key the name of the property we expect the object to have
     * @param expected the expected value of the object
     */
    testObjectProperty<T = any>(object: T, key: keyof T, expected: T) {
        /** prove the property exists */
        expect(object).to.haveOwnProperty(<string>key);

        /** prove the property is what we expect  */
        expect(object[key]).to.equal(expected[key]);
    }
};

export default $assertions;

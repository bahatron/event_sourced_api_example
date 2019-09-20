const uuid = require("uuid");
import moment from "moment";

export interface Record {
    uid: string;
    created_at: number;
    updated_at?: number;
}

const $recordFactory = {
    create: (data: any = {}): Record => {
        data = Object.assign({}, data);
        
        delete data._id;

        const record = Object.assign(
            {
                uid: <string>uuid.v4(),
                created_at: moment().unix()
            },
            data
        );

        return record;
    }
};
export default $recordFactory;

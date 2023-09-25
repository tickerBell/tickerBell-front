import { TableHeader } from "@/dummyData/DummyData";

export const DataTable = () => {


    return(

        <div>
            <div>{TableHeader.map((item : any)=>(
                {item.name}
            ))}</div>
            <div></div>
        </div>
    )
};

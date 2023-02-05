export class FilterCarsDto {
    PageNo: number;
    RecordsPerPage: number;
    SortOrder: number;
    SortColumn: string;
    FilterApplied: boolean;
    FilterParams:Array<filterParamsDTO>
}
 
export class filterParamsDTO
{
    FilterName: string;
    FilterValue: string;
    MatchMode: string;
    // {"ectSetId":"168237766-MQS-2208031201", "SearchInputParameter": {"FilterParams": [,{"FilterColum n":"ectTypId", "FilterValue":"-1", "MatchMode" : "NUMERIC_EQUALS"},{"FilterName": "ectActionCdId", "FilterValue":"-1", "MatchMode" : "NUMERIC_EQUALS"}]}
}

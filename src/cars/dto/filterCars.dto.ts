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
    FilterColumn: string;
    FilterText: string;
    MatchMode: string;
    // {"ectSetId":"168237766-MQS-2208031201", "SearchInputParameter": {"FilterParams": [,{"FilterColum n":"ectTypId", "FilterText":"-1", "MatchMode" : "NUMERIC_EQUALS"},{"FilterColumn": "ectActionCdId", "FilterText":"-1", "MatchMode" : "NUMERIC_EQUALS"}]}
}

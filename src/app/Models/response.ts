export class RequestResponse{
    constructor(){
        this.success = false;
        this.message = "Not data available";
        this.data = {};

    }
    public success: boolean = false;
    public message:string = "";
    public data:any;
    public errors:any;
    
}
var _info = {}
var _daily_arr = []
var _tea = 3421
var _sales = 4000
test()
function test(){
    const a = "今日业绩： "
    console.log(a.split("：")[1].trim() === "");
    
}
function excuse(sales,tea,daily){
    init(sales,tea,daily)
    handleDaily()
    handleDiary()
    return _daily_arr.join("\n");

}
function handleDaily(){
    set_value(_info.date,get_date())
    set_value(_info.today_sales,_sales)
    set_value(_info.today_ach,format((_sales/get_value(_info.today_target))))

    if(isWeek()){
        set_value(_info.weekly_total,_sales)
    }else{
        set_value(_info.weekly_total,parseFloat(get_value(_info.weekly_total))+parseFloat(_sales))
    }

    set_value(_info.weekly_ach,format(parseFloat(get_value(_info.weekly_total)) / get_value(_info.weekly_target)))
    
    set_value(_info.tea,_tea)

    if(isMonth()){
        set_value(_info.monthly_total,_sales)
        set_value(_info.tea_total,_tea)
    }else{
        set_value(_info.monthly_total,parseFloat(get_value(_info.monthly_total))+parseFloat(_sales))
        set_value(_info.tea_total,parseFloat(get_value(_info.tea_total))+parseFloat(_tea))
    }

    set_value(_info.monthly_ach,format(parseFloat(get_value(_info.monthly_total)) / get_value(_info.monthly_target)))
    
}
function handleDiary(){
    const diary_arr = _daily_arr[21].split("，")
    
    diary_arr[0] = "2.本月达标率"+get_value(_info.monthly_ach);
    diary_arr[1] = "还差"+format(1 - parseFloat(get_value(_info.monthly_ach))/100)+"没达标"
    
    const a = (parseFloat(get_value(_info.monthly_target)) - parseFloat(get_value(_info.monthly_total))) / get_days()
    diary_arr[2] = "接下来每天要完成："+Math.trunc(a)+"."+Math.floor(a % 1 * 100)+"的营业额才能达标。"
    
    _daily_arr[21] = diary_arr[0] + "，" + diary_arr[1] + "，" + diary_arr[2]
}
function get_value(index){
    const flag = _daily_arr[index].includes(":") ? ":" : "：";
    const a = _daily_arr[index].split(flag)[1]
    if(a.trim() === ""){
        return 0;
    }else{
        return _daily_arr[index].split(flag)[1];
    }
}
function set_value(index,value){
    const text = _daily_arr[index]
    const flag = text.includes(":") ? ":" : "：";
    _daily_arr[index] = text.split(flag)[0] + flag + value;
}
function get_date(){
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    return `${month}/${day}`;
}
function get_days(){

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();
    function getTotalDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }
    const currentYear = currentDate.getFullYear();
    const totalDaysInMonth = getTotalDaysInMonth(currentYear, currentMonth);
    const result = totalDaysInMonth - currentDay;
    return result === 0 ? 1 : result;
}
function isMonth(){
    return new Date().getDate() === 1;
}
function isWeek(){
    return new Date().getDay() === 1;
}
function format(value){
    const intValue = Math.trunc(value * 100);
    const decimalPart = Math.floor((value * 100) % 1 * 100);
    const result = `${intValue}.${decimalPart.toString().padStart(2, '0')}`;
    return result + "%";
}
function init(sales,tea,daily){
    _sales = sales
    _tea = tea
    _daily_arr = daily.split("\n");

    _info = {
        date:2,

        today_target:4,
        today_sales:6,
        today_ach:7,

        weekly_target:8,
        weekly_total:9,
        weekly_ach:10,

        monthly_target:11,
        monthly_total:12,
        monthly_ach:13,

        tea:14,
        tea_total:15
    }
}
var daily_str = `销售日报
天气:—…小雨转多云☁…—
日期:9/3
店铺:石家庄2店怀旧杂货铺
今日目标:4000
明日目标:4000
今日业绩：4000
今日达标率：100.00%
本周目标:32000
本周累计完成：0
本周达标率：15.85%
本月目标:130000
本月累计完成：0
本月达标率：5.22%
花茶：3421
花茶月累计:0


店铺日记:
1. 今日目标未完成
下午街上客流量少，都是零散进店，购买率低，晚上七点多街上客流慢慢变多一些，但进店率低，购买率低，导致业绩未完成。
2.本月达标率5.22%，还差94.78%没达标，接下来每天要完成：4563.12的营业额才能达标。
3.补货，整理排面，拍完排面，把零食柜子库存全部进行了收纳整理，玩具柜子没有整理，明天需要把后面零食柜子整理了，把缺的和少的货都拿了一些，整 
理完库存，把灯罩门口窗户都清理了，把冰箱底部废水清理了，明天需要把方便面和饮料全都拿出来清理，网格货架需要好好擦一擦。`
var _info = {}
var _daily_arr = []
var _tea = 3421
var _sales = 4000

function excuse(sales,tea,daily){
    init(sales,tea,daily)
    handleDaily()
    handleDiary()
    console.log(_daily_arr.join("\n"));
    
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
    return _daily_arr[index].split(flag)[1];
}
function set_value(index,value){
    const text = _daily_arr[index]
    const flag = text.includes(":") ? ":" : "：";
    if(index === 9){

    }
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
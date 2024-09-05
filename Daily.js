class SalesInfo{
    date
    today_target
    today_amount
    today_ach
    tomorrow_target 
    weekly_target
    weekly_total
    weekly_ach
    monthly_target
    monthly_total
    monthly_ach
    tea 
    tea_total
    list = ["日期","今日目标","今日业绩","今日达标率"
    ,"明日目标","本周目标","本周累计完成","本周达标率"
    ,"本月目标","本月累计完成","本月达标率"
    ,"花茶","花茶月累计"]
    constructor(daily){
        for(let i = 0; i < this.get_max_length(daily);i++){
            for(let j in this.list){
                let text = daily[i];
                let key = this.list[j];
                if(daily[i].includes(this.list[j])){
                    this.excuse(text,key);
                }
            }
        }
    }
    excuse(text,key){
        if(!(text.includes(":") || text.includes("："))){
            return ;
        }
        let flag = text.includes(":") ? ":" : "：";
        let text_key = text.split(flag)[0].trim();
        if(text_key.length != key.length){
            return ;
        }
        switch(key){
            case "日期":
                this.date = this.get_value(text); break;
            case "今日目标":
                this.today_target = this.get_value(text); break;
            case "今日业绩":
                this.today_amount = this.get_value(text); break;
            case "今日达标率":
                this.today_ach = this.get_value(text); break;
            case "明日目标":
                this.tomorrow_target = this.get_value(text); break;
            case "本周目标":
                this.weekly_target = this.get_value(text); break;
            case "本周累计完成":
                this.weekly_total = this.get_value(text); break;
            case "本周达标率":
                this.weekly_ach = this.get_value(text); break;
            case "本月目标":
                this.monthly_target = this.get_value(text); break;
            case "本月累计完成":
                this.monthly_total = this.get_value(text); break;
            case "本月达标率":
                this.monthly_ach = this.get_value(text); break;
            case "花茶":
                console.log(text);
                this.tea = this.get_value(text); break;
            case "花茶月累计":
                this.tea_total = this.get_value(text); break;
        }
    }
    get_value(text){
        let flag = text.includes(":") ? ":" : "：";
        return text.split(flag)[1];
    }
    get_max_length(daily){
        for(let i = 0; i < daily.length; i++){
            if(daily[i].includes("店铺日记")){
                return i;
            }
        }
    }
}
class Daily{
    amount = -1;
    tea = -1;
    daily = null;
    info = null;
    constructor(amount,tea,daily){
        this.amount = amount
        this.tea = tea
        this.daily = daily
        this.daily = `销售日报
        天气:—…多云🌤️…—
        日期:9/4
        店铺:石家庄2店怀旧杂货铺
        今日目标:4000
        明日目标:4000
        今日业绩：1000
        今日达标率：25.00%
        本周目标:32000
        本周累计完成：3360
        本周达标率：10.50%
        本月目标:130000
        本月累计完成：5081
        本月达标率：3.90%
        花茶：345
        花茶月累计:3431
        
        
        店铺日记:
        1. 今日目标未完成
        下午7点前街上客流量少，偶尔有进店，有闲逛也有购买，购买率低，七点左右以后街上客流量一阵多一阵少，都是零散进店，大多闲逛少数购买，购买率低，晚上十点以后街上客流慢慢变少，偶尔有进店，购买率低，导致业绩未完成。
        2.本月达标率3.90%，还差96.09%没达标，接下来每天要完成：4804.57的营业额才能达标。
        3.补货，整理排面，拍完排面，把玩具柜子进行了整理，把方便面和饮料的网格货架子擦了，由于网格架子容易堆积毛毛，需要每天都擦一擦，明天需要把门口摆放的物品全部拿走清理，物品要好好擦一擦，地面要遁，明天需要把种类多的产品整理一下排面，盒子不好和坏掉的要及时更换。`
        this.init()
    }
    init(){
        this.daily = this.daily.split('\n');
        this.info = new SalesInfo(this.daily)
        console.log(this.daily);
    }
    handel_sales(){
        this.set_value("今日业绩",this.amount);
        this.set_value("花茶",this.tea)
        this.set_value("今日达标率")
    }
    set_value(key,value){
        for(let i = 0; i < this.daily.length; i++){
            let text = this.daily[i];
            let flag = text.includes(":") ? ":" :"：";
            let temp_key = text.split(flag)[0].trim();
            if(temp_key == key){
                this.daily[i] = text.split(flag)[0] + flag + value;
            }
        }
    }
    get_date(){
        const currentDate = new Date();
        const month = currentDate.getMonth() + 1;
        const day = currentDate.getDate();
        return `${month}/${day}`;
    }
     get_days(){
    
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
    isMonth(){
        return new Date().getDate() === 1;
    }
    isWeek(){
        return new Date().getDay() === 1;
    }
    format(value){
        const intValue = Math.trunc(value * 100);
        const decimalPart = Math.floor((value * 100) % 1 * 100);
        const result = `${intValue}.${decimalPart.toString().padStart(2, '0')}`;
        return result + "%";
    }
}
new Daily()


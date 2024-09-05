class SalesInfo{
    date
    today_target
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
    list = ["日期","今日目标","今日达标率"
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
                this.today_target = parseFloat(this.get_value(text)); break;
            case "今日达标率":
                this.today_ach = this.get_value(text); break;
            case "明日目标":
                this.tomorrow_target = parseFloat(this.get_value(text)); break;
            case "本周目标":
                this.weekly_target = parseFloat(this.get_value(text)); break;
            case "本周累计完成":
                this.weekly_total = parseFloat(this.get_value(text)); break;
            case "本周达标率":
                this.weekly_ach = this.get_value(text); break;
            case "本月目标":
                this.monthly_target = parseFloat(this.get_value(text)); break;
            case "本月累计完成":
                this.monthly_total = parseFloat(this.get_value(text)); break;
            case "本月达标率":
                this.monthly_ach = this.get_value(text); break;
            case "花茶":
                console.log(text);
                this.tea = this.get_value(text); break;
            case "花茶月累计":
                this.tea_total = parseFloat(this.get_value(text)); break;
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
    amount
    tea
    daily
    info
    constructor(amount,tea,daily){
        this.amount = amount
        this.tea = tea
        this.daily = daily
        this.daily = `销售日报
        天气:—…晴…—
        日期:9/4
        店铺:石家庄1店 胜北记忆百货
        今日目标:4000
        明日目标:4000
        今日业绩:
        今日达标率：%
        本周目标:32000
        本周累计完成：2253.4
        本周达标率：%
        本月目标:120000
        本月累计完成:4315.9
        本月达标率：%
        花茶：
        花茶月累计：2088
        店铺日记:
        1. 今日目标未完成
        下午7点半左右前街上客流量少，偶尔有进店，购买率低，七点半左右后街上客流慢慢变多，零散进店，有闲逛也有购买，购买率低，九点半左右街上客流慢慢变少，偶尔有进店，进店率低，购买率低，导致业绩未完成。
        2.本月达标率%，还差%没达标，接下来每天要完成：的营业额才能达标。
        3.补货，整理排面，拍完排面，开始装未装完的姓氏熊，把姓氏熊进行了分类，把零食和玩具的排面进行了新的调整，如果新的位置卖不好，后期需要在调，零食位置高的地方，以后不需要垫盒子，位置偏低的可以多垫，把玩具坏的盒子进行了调换，明天需要把种类多的玩具和零食进行分类，争取把每一样都摆放出表面。
        `

        this.init()
        this.handel_sales();
        this.handel_diary();
    }
    init(){
        this.daily = this.daily.split('\n');
        for(let index in this.daily){
            let text = this.daily[index];
            this.daily[index] = text.trim();
        }
        this.info = new SalesInfo(this.daily)
    }
    handel_sales(){
        this.set_value("日期",this.get_date());
        this.set_value("今日业绩",this.amount);
        this.set_value("花茶",this.tea)
        this.set_value("今日达标率",this.format(this.info.today_target / this.amount)+"%")
        this.set_value("本周累计完成",parseFloat(this.info.weekly_total) +parseFloat(this.amount));
        this.set_value("本周达标率",this.format((this.info.weekly_total+this.amount) / this.info.weekly_target)+"%");
        this.set_value("本月累计完成",parseFloat(this.info.monthly_total) +parseFloat(this.amount));
        this.set_value("本月达标率",this.format((this.info.monthly_total+this.amount) / this.info.monthly_target)+"%");
        this.set_value("花茶月累计",parseFloat(this.info.tea_total) +parseFloat(this.tea));
    }
    handel_diary(){
        for(let index = 0; index < this.daily.length; index++){
            let text = this.daily[index];
            if(text.includes("2.本月达标率")){
                let month_ach = this.format((this.info.monthly_total+this.amount) / this.info.monthly_target)+"%";
                let a = 100 - parseFloat(month_ach) + "%";
      
                let avg = this.format_a(parseFloat(this.info.monthly_target - this.info.monthly_total - this.amount)/this.get_days());
                this.daily[index] = "2.本月达标率"+month_ach+"，还差"+a+"没达标，接下来每天要完成："+avg+"的营业额才能达标。"
            }
        }
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
    get_result(){
        return this.daily.join("\n")
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
        return result;
    }
    format_a(value){
        const intValue = Math.trunc(value);
        const decimalPart = Math.floor(value % 1 * 100);
        const result = `${intValue}.${decimalPart.toString().padStart(2, '0')}`;
        return result;
    }
}

let test = new Daily(4000,241,null)
console.log(test.get_result());


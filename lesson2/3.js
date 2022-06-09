const EventEmitter = require("events");
const {
    red,
    green,
    yellow
} = require("colors/safe");

const eventEmitter = new EventEmitter();

const args = process.argv.slice(2);
let timers = {};

const millisecondsToDate = (timestamp) => {
    const oneSecond = 1000;
    const oneMinute = oneSecond * 60;
    const oneHour = oneMinute * 60;
    const oneDay = oneHour * 24;
    const oneMonth = oneDay * 30;
    const oneYear = oneMonth * 12;

    const year = Math.floor(timestamp / oneYear);
    timestamp -= year * oneYear;

    const month = Math.floor(timestamp / oneMonth);
    timestamp -= month * oneMonth;

    const day = Math.floor(timestamp / oneDay);
    timestamp -= day * oneDay;

    const hours = Math.floor(timestamp / oneHour);
    timestamp -= hours * oneHour;

    const minutes = Math.floor(timestamp / oneMinute);
    timestamp -= minutes * oneMinute;

    const seconds = Math.floor(timestamp / oneSecond);
    timestamp -= seconds * oneSecond;

    let date = "";

    if (year) {
        date += year + " лет ";
    }

    if (month) {
        date += month + " месяцев ";
    }

    if (day) {
        date += day + " дней ";
    }

    if (hours) {
        date += hours + " часов ";
    }

    if (minutes) {
        date += minutes + " минут ";
    }

    if (seconds) {
        date += seconds + " секунд ";
    }

    return date;
};

for (const arg of args) {
    const parsedDate = arg.split("-");

    const date_now = +(new Date()) + 10800000;
    console.log(new Date(date_now));
    const stringDate = arg;
    var pattern = /^(\d{1,2})-(\d{1,2})-(\d{1,2})-(\d{4})$/;
    var arrayDate = stringDate.match(pattern);
    var date_end = +(new Date(arrayDate[4], arrayDate[3] - 1, arrayDate[2], arrayDate[1])) + 10800000;
    console.log(new Date(date_end));
    let sum = Math.round(date_end - date_now);

    if (sum <= 0) {
        console.log(
            red("Время исполнения таймера должно быть больше текущего: ", arg)
        );
        continue;
    }

    const timerDate = new Date(
        Date.UTC(parsedDate[3], parsedDate[2] - 1, parsedDate[1], parsedDate[0])
    );
    const formattedDate = timerDate
        .toISOString()
        .replace("T", " ")
        .replace("Z", "")
        .replace(".000", "");

    timers[formattedDate] = sum;
}

setInterval(() => {
    const newTimers = {};

    Object.keys(timers).map((timer) => {
        const delta = timers[timer] - 1000;
        let message = yellow(`Таймер ${timer} исполнен`);

        if (delta) {
            newTimers[timer] = delta;
            message = green(
                `До исполнения таймера ${timer} осталось ${millisecondsToDate(delta)}`
            );
        }

        eventEmitter.emit("timer", message);
    });

    if (!Object.keys(newTimers).length) {
        console.log(green("\nВсе таймеры успешно исполнены!!!"));
        process.exit(0);
    }

    timers = newTimers;

    console.log("");
}, 1000);

eventEmitter.on("timer", console.log);
import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (error) => {
    console.log(chalk.bgRed(' ОШИБКА ') + ' ' + error);
}

const printSuccess = (message) => {
    console.log(chalk.bgGreen(' УСПЕШНО ') + ' ' + message);
}

const printHelp = () => {
    console.log(
        dedent`
        ${chalk.bgCyan(' ПОМОЩЬ ')}
        Без параметров - вывод погоды
        -s [CITY] для установки города
        -h для вывода помощи
        -t [API_KEY] для сохранения токена
        
        `
    );
}

const printWeather = (weather) => {
    console.log(
        dedent`
        ${chalk.bgBlue(' ПОГОДА ')}
        Город: ${weather.name}
        В городе ${weather.weather[0].description} || 
        Температура: ${weather.main.temp}°C
        Ощущается как: ${weather.main.feels_like}°C
        `
    );
}

export {printSuccess, printError, printHelp, printWeather}
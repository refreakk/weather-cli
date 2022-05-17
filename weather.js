#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { getWeather } from "./services/api.service.js";
import { printHelp, printError, printSuccess, printWeather } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY } from "./services/storage.service.js";

const saveToken = async (token) => {
    if(!token.length) {
        printError('Не передан token');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess('Токен сохранен')
    } catch (err) {
        printError(err.message);
    }
}

const saveCity = async (city) => {
    if(!city.length) {
        printError('Не передан город');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess('Город сохранен')
    } catch (err) {
        printError(err.message);
    }
}

const getForcast = async () => {
    try {
        const weather = await getWeather();
        printWeather(weather);
    } catch (err) {
        if(err?.response?.status == 404) {
            printError('Неверно указан город')
        } else if (err?.response?.status == 401) {
            printError('Неверно указан токен')
        } else {
            printError(err.message)
        }
    }
}

const initCLI = () => {
    const args = getArgs(process.argv);
    if(args.h) {
        printHelp();
    }

    if(args.s) {
        return saveCity(args.s);
    }

    if(args.t) {
        return saveToken(args.t);
    }
    getForcast();
}

initCLI();
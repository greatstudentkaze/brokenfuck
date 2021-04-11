import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import cheerio from 'cheerio';
import puppeteer from 'puppeteer'

import { IMission } from './models/mission';

interface IMissionData {
  title: IMission['title'],
  description: IMission['description'],
  operationalPoints: IMission['operationalPoints'],
  points: IMission['points'],
  type: IMission['type'],
  week: IMission['week'],
}

const Selector = {
  'RU_HIERARCHY': '#ru-hierarchy',
  'EN_HIERARCHY': '#hierarchy',
  'WEEK': '.week',
  'MISSION': '.mission',
  'MISSION_NAME': '.questName',
  'MISSION_DESCRIPTION': '.questDescriptionText',
  'MISSION_DATA': '.mission-data-list',
  'MISSION_TYPE': '.gamemode',
  'MISSION_POINTS': '.points',
  'MISSION_OPERATIONAL_POINTS': '.operational-points',
  'MISSION_LOC_NAME': '.loc-name',
};

const LAUNCH_PUPPETEER_OPTS = {
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-accelerated-2d-canvas',
    '--disable-gpu',
    '--window-size=1920x1080'
  ]
};

const PAGE_PUPPETEER_OPTS = {
  networkIdle2Timeout: 5000,
  waitUntil: 'networkidle2',
  timeout: 3000000
};

export const getPageContent = async (url: string) => {
  try {
    const browser = await puppeteer.launch(LAUNCH_PUPPETEER_OPTS);
    const page = await browser.newPage();
    await page.goto(url);

    const content = await page.content();
    await browser.close();

    return content;
  } catch (err) {
    throw err;
  }
};

export const getTrimmedTextOfElement = (element: cheerio.Cheerio): string => element.text().trim();

class Saver {
  private readonly dirname: string;
  private readonly saveDir: string;

  constructor(saveDir: string) {
    this.dirname = path.resolve();
    this.saveDir = saveDir;
  }

  public async saveMissions(data: IMissionData[]) {
    const fileName = `missions.js`;
    const savePath = path.join(this.dirname, this.saveDir, fileName);

    return new Promise(((resolve, reject) => {
      fs.writeFile(savePath, JSON.stringify(data, null, 2), err => {
        if (err) {
          return reject(err);
        }

        Saver.successfulSave(fileName);
        resolve(true);
      })
    }));
  }

  private static successfulSave(fileName: string) {
    console.log(chalk.green('Файл был успешно сохранен: ' + chalk.green.bold(fileName)));
  }
}

const MissionTypes = new Map([
  ['scrimcomp2v2', 'wingman'],
  ['cooperative', 'coop'],
  ['coopmission', 'coop'],
  ['casual', 'casual'],
  ['gungametrbomb', 'casual'],
  ['gungameprogressive', 'armsrace'],
  ['deathmatch', 'deathmatch'],
  ['competitive', 'competitive'],
  ['survival', 'dangerzone'],
]);

const saver = new Saver('data');

(async () => {
  try {
    const url = 'https://greatstudentkaze.ru/brokenfuck/missions/';
    const pageContent = await getPageContent(url);

    const $ = cheerio.load(pageContent);
    const $ruHierarchy = $(Selector.RU_HIERARCHY);
    const $enHierarchy = $(Selector.EN_HIERARCHY);

    const $ruWeeks = $ruHierarchy.find(Selector.WEEK);
    const $enWeeks = $enHierarchy.find(Selector.WEEK);
    const missionsWithTempId = [] as Array<IMissionData & { tempId: string }>;

    $ruWeeks.each((index, cheerioElement) => {
      const weekElement = $(cheerioElement);
      const $missionElements = weekElement.find(Selector.MISSION);

      $missionElements.each((_, cheerioElement) => {
        const element = $(cheerioElement);

        const points = getTrimmedTextOfElement(element.find(`${Selector.MISSION_POINTS}`))
          .split(',')
          .map(point => Number(point));

        points.sort((a, b) => a - b);

        const gamemode = getTrimmedTextOfElement(element.find(`${Selector.MISSION_TYPE}`));

        const mission: IMissionData & { tempId: string } = {
          week: index + 1,
          tempId: getTrimmedTextOfElement(element.find(`${Selector.MISSION_LOC_NAME}`)),
          title: {
            ru: getTrimmedTextOfElement(element.find(Selector.MISSION_NAME)),
            en: '',
          },
          description: {
            ru: getTrimmedTextOfElement(element.find(Selector.MISSION_DESCRIPTION)),
            en: '',
          },
          operationalPoints: Number(getTrimmedTextOfElement(element.find(`${Selector.MISSION_OPERATIONAL_POINTS}`))),
          points,
          type: MissionTypes.get(gamemode) as IMission['type'],
        };

        missionsWithTempId.push(mission);
      });
    });

    $enWeeks.each((_, cheerioElement) => {
      const weekElement = $(cheerioElement);
      const $missionElements = weekElement.find(Selector.MISSION);

      $missionElements.each((i, cheerioElement) => {
        const element = $(cheerioElement);

        const tempId = getTrimmedTextOfElement(element.find(`${Selector.MISSION_LOC_NAME}`));
        const mission = missionsWithTempId.find(mission => mission.tempId === tempId);
        if (!mission) {
          throw new Error('Bad temp id');
        }

        mission.title.en = getTrimmedTextOfElement(element.find(Selector.MISSION_NAME));
        mission.description.en = getTrimmedTextOfElement(element.find(Selector.MISSION_DESCRIPTION));
      });
    });

    const missions: IMissionData[] = missionsWithTempId.map(({ tempId, ...mission }) => mission);

    await saver.saveMissions(missions);
  } catch (err) {
    console.log(chalk.red('Произошла ошибка!'));
    console.log(err);
  }
})();

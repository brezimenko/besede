import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Word } from "./word.entity";
import { Repository } from "typeorm";
import { InjectBrowser } from "nest-puppeteer";
import type { Browser } from 'puppeteer';
import { WordCreateDto } from "./dtos/word-create.dto";
import { normalize } from "./utils/normalizeWords";

@Injectable()
export class WordsService {
  constructor(@InjectRepository(Word) private repo: Repository<Word>, @InjectBrowser() private browser: Browser) {
  }

  async scrapeTheShitOutOfSSKJ() {
    const scrapeDictionary = async (pageNumber: number) => {
      const page = await this.browser.newPage()
      await page.goto(`https://www.fran.si/iskanje?page=${pageNumber}&FilteredDictionaryIds=133&View=1&Query=*`)
      console.log('iteration SCRAPE 1')
      await page.waitForSelector('.fran-left-content')
      const entries = await page.$$eval('.entry-content', entries => {
        return entries.map(entry => {
          const word = entry.querySelector('.font_xlarge')?.textContent
          const definition = entry.querySelector('.color_dark.italic')?.textContent
          const synonym = entry.querySelector('.reference')?.textContent
          const examples = Array.from(entry.querySelectorAll('.color_lightdark.tooltipstered')).map(el => el?.textContent)
          return {word, definition, examples, synonym}
        })
      })
      await page.close()
      return entries
    }
    console.log('iteration SCRAPE 2')
    const strays = [3142, 3800 - 3950, 4500 - 4600, 4710, 4799]
    for (let i = 4799; i < 4809; i++) {
      setTimeout(() => {
        console.log('yoyo')
        scrapeDictionary(i).then(items => {
          console.log('iteration SCRAPE', i)
          items.forEach(item => this.createWord(item))
        }).catch(err => {
          console.log('iteration', i)
          console.log(err)
        })
      }, 1000 * (i - 4799))
    }
  }

  async normalizeWord(word: string) {
    const count = await this.repo.count()
    for (let i = 1; i <= count; i++) {
      const wordEntity = await this.repo.findOneBy({id: i})
      Object.assign(wordEntity, {normalizedWord: normalize(wordEntity.word)})
      if (wordEntity.word === word) {
        return wordEntity
      }
    }
  }

  async createWord(wordObject: WordCreateDto) {
    const existingWord = await this.repo.findOneBy({ word: wordObject.word })
    if (existingWord) {
      return existingWord
    }
    const nowFormattedISO = new Date().toISOString()
    const wordEntity = this.repo.create({ ...wordObject, createdAt: nowFormattedISO, updatedAt: nowFormattedISO, examples: JSON.stringify(wordObject.examples), normalizedWord: normalize(wordObject.word) })
    return this.repo.save(wordEntity)
  }
  getWord(id: number) {
    return this.repo.findOneBy({id})
  }

  async getRandomWord() {
    const numItems = await this.repo.count()
    const randomIndex = Math.ceil(Math.random() * numItems)
    return this.repo.findOneBy({id: randomIndex})
  }

  async updateWord(id: number, attrs: Partial<WordCreateDto>) {
    const word = await this.getWord(id)
    if (!word) {
      return new NotFoundException('Word not found')
    }
    Object.assign(word, attrs)
    return this.repo.save(word)
  }

  async removeWord(id: number) {
    const word = await this.getWord(id)
    if (!word) {
      return new NotFoundException('Word not found')
    }
    return this.repo.remove(word)
  }
}

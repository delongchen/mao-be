import CdlKoa, { middlewares } from 'cdl-koa'
import {createLogger} from "bunyan";


const { parseJSON, writeJSON } = middlewares.body
const logger = createLogger({
  stream: process.stdout,
  name: 'http server'
})

const app = new CdlKoa({
  cors: true,
  async interceptor(ctx, next) {
    const { url, method } = ctx.req
    logger.info({ url, method })
    await next()
  }
})

interface TestData {
  info: string
  code: number
}

app.post('/json', [
  parseJSON,
  async (ctx, next) => {
    // 如果解析post body成功json会挂在ctx.state.data上
    // 不成功的话不会到这里
    const data = <TestData>ctx.state.data
    data.info += ' ok'
    data.code = 1
    await next()
  },
  writeJSON
])

export {
  app
}

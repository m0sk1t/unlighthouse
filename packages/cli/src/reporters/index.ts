import { join } from 'node:path'
import fse from 'fs-extra'
import type { ResolvedUserConfig, UnlighthouseRouteReport } from '@unlighthouse/core'
import { reportJsonSimple } from './jsonSimple'
import { reportJsonExpanded } from './jsonExpanded'
import type { ReportJsonExpanded, ReportJsonSimple } from './types'

export function generateReportPayload(reporter: 'jsonExpanded', reports: UnlighthouseRouteReport[]): ReportJsonExpanded
export function generateReportPayload(reporter: 'jsonSimple', reports: UnlighthouseRouteReport[]): ReportJsonSimple
export function generateReportPayload(reporter: string, reports: UnlighthouseRouteReport[]): any {
  if (reporter.startsWith('json'))
    return reporter === 'jsonSimple' ? reportJsonSimple(reports) : reportJsonExpanded(reports)

  throw new Error(`Unsupported reporter: ${reporter}.`)
}

export async function outputReport(reporter: string, config: Partial<ResolvedUserConfig>, payload: any) {
  if (reporter.startsWith('json')) {
    const path = join(config.root, config.outputPath, 'ci-result.json')
    await fse.writeJson(path, payload, { spaces: 2 })
    return path
  }
  throw new Error(`Unsupported reporter: ${reporter}.`)
}

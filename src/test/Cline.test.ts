import { expect } from "chai"
import { Cline } from "../core/Cline"
import { TerminalManager } from "../integrations/terminal/TerminalManager"
import { ApiHandler, buildApiHandler } from "../api"
import { ApiConfiguration } from "../shared/api"
import { ClineProvider } from "../core/webview/ClineProvider"
import { HistoryItem } from "../shared/HistoryItem"

describe("Cline", () => {
  let cline: Cline
  let terminalManager: TerminalManager
  let apiHandler: ApiHandler
  let provider: ClineProvider
  let apiConfiguration: ApiConfiguration

  beforeEach(() => {
    provider = {} as ClineProvider
    apiConfiguration = {} as ApiConfiguration
    apiHandler = buildApiHandler(apiConfiguration)
    terminalManager = new TerminalManager()
    cline = new Cline(provider, apiConfiguration)
  })

  describe("initiateTaskLoop", () => {
    it("should include autonomous writing", async () => {
      const userContent = [
        {
          type: "text",
          text: "<task>\nTest task\n</task>",
        },
      ]
      const initiateTaskLoopSpy = sinon.spy(cline, "initiateTaskLoop")
      await cline.initiateTaskLoop(userContent)
      expect(initiateTaskLoopSpy.calledOnce).to.be.true
    })
  })

  describe("executeCommandTool", () => {
    it("should handle specific task execution", async () => {
      const command = "echo Hello, World!"
      const [userRejected, result] = await cline.executeCommandTool(command)
      expect(userRejected).to.be.false
      expect(result).to.include("Hello, World!")
    })
  })
})

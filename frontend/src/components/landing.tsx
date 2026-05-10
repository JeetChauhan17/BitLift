import { Github, Globe as GlobeIcon, Cloud, GitBranch, Terminal, Box, ArrowRight } from "lucide-react"
import { useState } from "react"
import axios from "axios"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Globe from "@/components/ui/globe"

const BACKEND_UPLOAD_URL = "http://localhost:3000"

export function Landing() {
  const [repoUrl, setRepoUrl] = useState("")
  const [uploadId, setUploadId] = useState("")
  const [uploading, setUploading] = useState(false)
  const [deployed, setDeployed] = useState(false)

  const handleDeploy = async () => {
    setUploading(true)
    const res = await axios.post(`${BACKEND_UPLOAD_URL}/deploy`, {
      repoUrl,
    })
    setUploadId(res.data.id)
    setUploading(false)
    const interval = setInterval(async () => {
      const response = await axios.get(
        `${BACKEND_UPLOAD_URL}/status?id=${res.data.id}`
      )
      if (response.data.status === "deployed") {
        clearInterval(interval)
        setDeployed(true)
      }
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">B</span>
          </div>
          <span className="text-lg font-semibold">BitLift</span>
        </div>
        <a
          href="https://github.com/JeetChauhan17/BitLift-Main"
          target="_blank"
          rel="noreferrer"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          <Github className="h-5 w-5" />
        </a>
      </header>

      <section className="mx-auto max-w-6xl px-6 pb-32 pt-16 sm:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h1 className="mb-6 text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl md:text-7xl">
              Deploy from a
              <br />
              GitHub repo.
            </h1>
            <p className="mb-10 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              BitLift is a self-hosted deployment tool. Point it at a GitHub
              repo, it clones, builds, and hosts your site. Redis does the
              queueing, you do nothing.
            </p>

            <Card className="border-border/50 shadow-lg shadow-primary/[0.03]">
              <CardHeader>
                <CardTitle>Deploy a repo</CardTitle>
                <CardDescription>
                  Paste a GitHub URL and hit deploy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <Input
                    onChange={(e) => setRepoUrl(e.target.value)}
                    placeholder="https://github.com/username/repo"
                    className="flex-1"
                  />
                  <Button
                    onClick={handleDeploy}
                    disabled={uploadId !== "" || uploading || !repoUrl}
                    size="lg"
                    className="gap-2"
                  >
                    {uploading
                      ? "Uploading..."
                      : uploadId
                        ? "Deploying..."
                        : "Deploy"}
                    {!uploading && !uploadId && (
                      <ArrowRight className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {deployed && (
              <Card className="mt-6 border-emerald-500/30 bg-emerald-500/5">
                <CardHeader>
                  <CardTitle className="text-emerald-600 dark:text-emerald-400">
                    Deployed
                  </CardTitle>
                  <CardDescription>Your site is live</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3">
                    <Input
                      readOnly
                      value={`http://${uploadId}.localhost:3001/index.html`}
                      className="flex-1"
                    />
                    <Button variant="outline" asChild>
                      <a
                        href={`http://${uploadId}.localhost:3001/index.html`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Visit
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="hidden lg:block">
            <Globe
              baseColor={[0.4, 0.6509, 1]}
              markerColor={[251 / 255, 100 / 255, 21 / 255]}
              glowColor={[0.2745, 0.5765, 0.898]}
            />
          </div>
        </div>
      </section>

      <section className="border-t border-border/40 bg-muted/40">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <div className="grid gap-16 md:grid-cols-2 md:gap-20">
            <div>
              <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">
                How it works
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Three moving parts. One pipeline.
              </p>
            </div>
            <div className="space-y-10">
              {steps.map((step) => (
                <div key={step.title} className="flex gap-5">
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <step.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-1.5 font-semibold">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="mb-14">
          <h2 className="mb-3 text-2xl font-bold tracking-tight sm:text-3xl">
            What's inside
          </h2>
          <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
            The parts that make BitLift work. Nothing more, nothing less.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-border/50 p-6">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <Terminal className="h-4 w-4 text-primary" />
            </div>
            <h3 className="mb-1.5 font-semibold">bitlift CLI</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Deploy from your terminal. The CLI handles uploads and talks to
              the deploy service.
            </p>
          </div>
          <div className="rounded-xl border border-border/50 p-6">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <Cloud className="h-4 w-4 text-primary" />
            </div>
            <h3 className="mb-1.5 font-semibold">Deploy service</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Accepts uploads from the CLI and pushes them into the processing
              pipeline.
            </p>
          </div>
          <div className="rounded-xl border border-border/50 p-6">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <GitBranch className="h-4 w-4 text-primary" />
            </div>
            <h3 className="mb-1.5 font-semibold">Request handler</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Redis-backed worker that processes deployments in the background.
            </p>
          </div>
          <div className="rounded-xl border border-border/50 p-6">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <GlobeIcon className="h-4 w-4 text-primary" />
            </div>
            <h3 className="mb-1.5 font-semibold">Static hosting</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Each deployment gets a unique URL served via http-server. No
              configuration needed.
            </p>
          </div>
          <div className="rounded-xl border border-border/50 p-6">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <Box className="h-4 w-4 text-primary" />
            </div>
            <h3 className="mb-1.5 font-semibold">Backblaze B2 storage</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Cloud object storage for deployment artifacts. Optional,
              pluggable, yours.
            </p>
          </div>
          <div className="rounded-xl border border-border/50 p-6">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <Github className="h-4 w-4 text-primary" />
            </div>
            <h3 className="mb-1.5 font-semibold">GitHub API</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Clone, build, and deploy any public GitHub repository
              automatically.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/40 bg-muted/40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 text-sm text-muted-foreground">
          <p>BitLift &mdash; MIT License</p>
          <a
            href="https://github.com/JeetChauhan17/BitLift-Main"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            <Github className="h-4 w-4" />
          </a>
        </div>
      </footer>
    </div>
  )
}

const steps = [
  {
    icon: Github,
    title: "Point at a repo",
    description:
      "Give BitLift a GitHub URL. It clones the repository and stages it for processing.",
  },
  {
    icon: Cloud,
    title: "Workers pick it up",
    description:
      "Redis queues the job. A background worker builds the project and uploads the output.",
  },
  {
    icon: GlobeIcon,
    title: "It goes live",
    description:
      "The site is served at its own URL. No config, no DNS, just a working page.",
  },
]

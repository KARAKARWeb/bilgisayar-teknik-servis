import { CheckCircle, FileText, Code, Rocket } from 'lucide-react'

const icons = [FileText, CheckCircle, Code, Rocket]

export function ProcessSection({ pageContent }: { pageContent?: any }) {
  const steps = pageContent?.homepage?.process?.steps
  
  if (!steps || steps.length === 0) {
    return null
  }
  
  const filteredSteps = steps.filter((step: any) => step.title || step.description)
  
  if (filteredSteps.length === 0) {
    return null
  }
  
  const stepsWithIcons = filteredSteps.map((step: any, index: number) => ({
    ...step,
    number: index + 1,
    icon: icons[index] || FileText
  }))
  return (
    <section className="border-t border-gray-200 bg-gray-50 py-16 md:py-24">
      <div className="container">
        {pageContent?.homepage?.process?.title && (
          <div className="mb-16 text-center">
            <h2 className="text-h2-mobile font-semibold text-black md:text-h2-desktop">
              {pageContent.homepage.process.title}
            </h2>
            {pageContent.homepage.process.subtitle && (
              <p className="mt-6 text-center text-lg text-gray-600 max-w-3xl mx-auto">
                {pageContent.homepage.process.subtitle}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stepsWithIcons.map((step: any, index: number) => {
            const Icon = step.icon
            
            return (
              <div 
                key={`process-step-${index}`}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 transition-all hover:border-black hover:shadow-xl"
              >
                {/* Icon */}
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gray-50 transition-colors group-hover:bg-black">
                  <Icon className="h-8 w-8 text-black transition-colors group-hover:text-white" />
                </div>
                
                {/* Content */}
                {step.title && (
                  <h3 className="mb-3 text-xl font-semibold text-black">
                    {step.title}
                  </h3>
                )}
                {step.description && (
                  <p className="text-sm leading-relaxed text-gray-900">
                    {step.description}
                  </p>
                )}
                
                {/* Hover Gradient Effect */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            )
          })}
        </div>

        {pageContent?.homepage?.process?.description && (
          <div className="mt-12 text-center max-w-2xl mx-auto">
            <p className="text-lg text-gray-600">
              {pageContent.homepage.process.description}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

'use client'

import { Laptop, Monitor, Printer, Wifi, HardDrive, Server, Cpu, MonitorSpeaker, Check } from 'lucide-react'

interface DevicesSectionProps {
  pageContent?: any
}

export function DevicesSection({ pageContent }: DevicesSectionProps) {
  const devices = pageContent?.homepage?.devices

  if (!devices || !devices.items || devices.items.length === 0) {
    return null
  }

  const getDeviceIcon = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      'laptop': Laptop,
      'desktop': Monitor,
      'all-in-one': MonitorSpeaker,
      'apple': Laptop,
      'printer': Printer,
      'modem': Wifi,
      'switch': Wifi,
      'nas': HardDrive,
      'server': Server,
      'workstation': Cpu,
      'monitor': Monitor,
    }
    return iconMap[iconName] || Monitor
  }

  return (
    <section className="py-20 relative overflow-hidden bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-h2-mobile font-semibold text-black md:text-h2-desktop">
            {devices.title}
          </h2>
          {devices.subtitle && (
            <p className="mt-6 text-center text-lg text-gray-600 max-w-3xl mx-auto">
              {devices.subtitle}
            </p>
          )}
        </div>

        {/* Devices List - Modern Badge Style */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devices.items.map((device: any, index: number) => {
              const Icon = getDeviceIcon(device.icon)
              
              return (
                <div
                  key={index}
                  className="group flex items-center gap-4 p-5 rounded-xl border transition-all duration-300"
                  style={{
                    borderColor: 'rgb(229, 229, 229)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#0070f3'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgb(229, 229, 229)'
                  }}
                >
                  {/* Icon Circle */}
                  <div 
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: 'rgba(0, 112, 243, 0.08)',
                    }}
                  >
                    <Icon className="h-6 w-6 text-[#0070f3]" strokeWidth={2} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900 mb-1 group-hover:text-[#0070f3] transition-colors">
                      {device.name}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {device.description}
                    </p>
                  </div>

                  {/* Check Icon */}
                  <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Check className="h-5 w-5 text-[#0070f3]" strokeWidth={2.5} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

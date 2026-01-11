'use client'

import { useState, useEffect, useRef } from 'react'

// Types
export interface ServiceOption {
  id: string
  name: string
  description: string
  emoji: string
  pricePerUnit: number
  unit: 'sqft' | 'linear_ft' | 'each' | 'hour'
  minPrice: number
  estimateBuffer: number
}

export interface ProjectType {
  id: string
  label: string
  emoji: string
  description: string
  discount?: number
}

export interface ConditionOption {
  id: string
  label: string
  description: string
  adjustment: number
}

export interface ChatbotConfig {
  businessName: string
  industry: string
  tagline: string
  welcomeMessage: string
  services: ServiceOption[]
  projectTypes: ProjectType[]
  conditions?: ConditionOption[]
  useMapMeasurement: boolean
  measurementType: 'area' | 'linear' | 'count' | 'none'
  askCondition: boolean
  colors: {
    primary: string
    secondary: string
    background: string
    cardBg: string
    border: string
    textMuted: string
  }
}

interface BookingData {
  service: string
  serviceName: string
  serviceEmoji: string
  projectType: string
  projectTypeName: string
  discount: number
  address: string
  measurement: number
  measurementLabel: string
  condition: string
  conditionLabel: string
  estimateLow: number
  estimateHigh: number
  preferredDate: string
  preferredDateLabel: string
  name: string
  phone: string
}

const STEPS = {
  SERVICE: 'service',
  PROJECT_TYPE: 'project_type',
  ADDRESS: 'address',
  ANALYZING: 'analyzing',
  MAP_MEASURE: 'map_measure',
  CONFIRM_MEASUREMENT: 'confirm_measurement',
  MANUAL_MEASURE: 'manual_measure',
  CONDITION: 'condition',
  DATE: 'date',
  CONTACT: 'contact',
  SUMMARY: 'summary',
  COMPLETE: 'complete'
}

interface Props {
  config: ChatbotConfig
  inline?: boolean
}

// Declare google on window
declare global {
  interface Window {
    google?: {
      maps: {
        Map: new (element: HTMLElement, options: MapOptions) => GoogleMap
        Geocoder: new () => Geocoder
        Marker: new (options: MarkerOptions) => Marker
        Polygon: new (options: PolygonOptions) => Polygon
        SymbolPath: { CIRCLE: number }
        event: {
          addListener: (instance: object, event: string, handler: (...args: never[]) => void) => void
        }
        drawing: {
          DrawingManager: new (options: DrawingManagerOptions) => DrawingManager
          OverlayType: { POLYGON: string }
        }
        geometry: {
          spherical: {
            computeArea: (path: unknown) => number
          }
        }
      }
    }
  }
}

interface MapOptions {
  center: { lat: number; lng: number }
  zoom: number
  mapTypeId: string
  disableDefaultUI: boolean
  zoomControl: boolean
  gestureHandling: string
}

interface GoogleMap {
  getCenter: () => { lat: () => number; lng: () => number }
  setCenter: (center: { lat: number; lng: number }) => void
}

interface Geocoder {
  geocode: (request: { address: string }, callback: (results: GeocoderResult[], status: string) => void) => void
}

interface GeocoderResult {
  geometry: { location: { lat: () => number; lng: () => number } }
  formatted_address: string
}

interface MarkerOptions {
  position: { lat: number; lng: number }
  map: GoogleMap
  icon?: { path: number; scale: number; fillColor: string; fillOpacity: number; strokeColor: string; strokeWeight: number }
  title?: string
}

interface Marker {
  setMap: (map: GoogleMap | null) => void
}

interface PolygonOptions {
  paths?: { lat: number; lng: number }[]
  map?: GoogleMap
  draggable?: boolean
  clickable?: boolean
  geodesic?: boolean
  fillColor?: string
  fillOpacity?: number
  strokeColor?: string
  strokeWeight?: number
  strokeOpacity?: number
  editable?: boolean
}

interface Polygon {
  setMap: (map: GoogleMap | null) => void
  getPath: () => unknown
  setPath: (path: { lat: number; lng: number }[]) => void
}

interface DrawingManagerOptions {
  drawingMode?: string | null
  drawingControl: boolean
  polygonOptions?: PolygonOptions
}

interface DrawingManager {
  setMap: (map: GoogleMap | null) => void
  setDrawingMode: (mode: string | null) => void
}

export default function ServiceChatbot({ config, inline = false }: Props) {
  const [isOpen, setIsOpen] = useState(inline)
  const [step, setStep] = useState(STEPS.SERVICE)
  const [messages, setMessages] = useState<{type: string, text: string}[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapError, setMapError] = useState(false)
  const [drawnArea, setDrawnArea] = useState<number | null>(null)
  const [aiEstimatedArea, setAiEstimatedArea] = useState<number | null>(null)
  const [manualAreaInput, setManualAreaInput] = useState('')
  const [aiPolygonPoints, setAiPolygonPoints] = useState<{lat: number, lng: number}[]>([])
  const [propertyCoords, setPropertyCoords] = useState<{lat: number, lng: number} | null>(null)

  const [bookingData, setBookingData] = useState<BookingData>({
    service: '',
    serviceName: '',
    serviceEmoji: '',
    projectType: '',
    projectTypeName: '',
    discount: 0,
    address: '',
    measurement: 0,
    measurementLabel: '',
    condition: '',
    conditionLabel: '',
    estimateLow: 0,
    estimateHigh: 0,
    preferredDate: '',
    preferredDateLabel: '',
    name: '',
    phone: '',
  })

  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<GoogleMap | null>(null)
  const drawingManagerRef = useRef<DrawingManager | null>(null)
  const polygonRef = useRef<Polygon | null>(null)
  const geocodedLocation = useRef<{ lat: number; lng: number } | null>(null)

  const { colors } = config

  const scrollToBottom = () => {
    setTimeout(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
      }
    }, 100)
  }

  useEffect(() => { scrollToBottom() }, [messages])

  const addBotMessage = async (text: string, delay = 300) => {
    setIsTyping(true)
    await new Promise(r => setTimeout(r, delay))
    setIsTyping(false)
    setMessages(prev => [...prev, { type: 'bot', text }])
  }

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, { type: 'user', text }])
  }

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage(config.welcomeMessage, 200)
    }
  }, [isOpen, messages.length, config.welcomeMessage])

  const calculateEstimate = (measurement: number, serviceId: string, discount = 0) => {
    const service = config.services.find(s => s.id === serviceId)
    if (!service) return { low: 0, high: 0 }
    let base = measurement * service.pricePerUnit
    base = Math.max(base, service.minPrice)
    if (discount > 0) base = base * (1 - discount)
    const buffer = service.estimateBuffer || 0.20
    return { low: Math.round(base * (1 - buffer)), high: Math.round(base * (1 + buffer)) }
  }

  const getAvailableDates = () => {
    const dates: { label: string; value: string }[] = []
    const today = new Date()
    for (let i = 2; i <= 14 && dates.length < 6; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      if (date.getDay() !== 0) {
        dates.push({
          label: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
          value: date.toISOString().split('T')[0]
        })
      }
    }
    return dates
  }

  const getMeasurementUnit = () => {
    const service = config.services.find(s => s.id === bookingData.service)
    if (!service) return ''
    switch (service.unit) {
      case 'sqft': return 'sq ft'
      case 'linear_ft': return 'ft'
      case 'each': return ''
      case 'hour': return 'hrs'
      default: return ''
    }
  }

  // Generate a polygon for a given area around a center point
  const generatePolygonForArea = (center: {lat: number, lng: number}, areaSqFt: number): {lat: number, lng: number}[] => {
    // Convert sq ft to sq meters
    const areaSqM = areaSqFt * 0.0929
    // Calculate the side length of a square with this area
    const sideLengthM = Math.sqrt(areaSqM)
    // Convert to degrees (approximate at this latitude)
    const latOffset = (sideLengthM / 111320) * 0.5 // 111320 meters per degree latitude
    const lngOffset = (sideLengthM / (111320 * Math.cos(center.lat * Math.PI / 180))) * 0.5

    // Create a roughly square polygon with slight variations for realism
    const variation = 0.15 // 15% variation
    return [
      { lat: center.lat + latOffset * (1 + Math.random() * variation), lng: center.lng - lngOffset * (1 + Math.random() * variation) },
      { lat: center.lat + latOffset * (1 - Math.random() * variation), lng: center.lng + lngOffset * (1 + Math.random() * variation) },
      { lat: center.lat - latOffset * (1 + Math.random() * variation), lng: center.lng + lngOffset * (1 - Math.random() * variation) },
      { lat: center.lat - latOffset * (1 - Math.random() * variation), lng: center.lng - lngOffset * (1 - Math.random() * variation) },
    ]
  }

  // Generate static map URL with polygon
  const getStaticMapUrl = (center: {lat: number, lng: number}, polygon: {lat: number, lng: number}[]) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    if (!apiKey || polygon.length === 0) return null

    // Create polygon path string for static maps API
    const pathPoints = [...polygon, polygon[0]].map(p => `${p.lat},${p.lng}`).join('|')
    const primaryColor = colors.primary.replace('#', '')

    return `https://maps.googleapis.com/maps/api/staticmap?center=${center.lat},${center.lng}&zoom=19&size=400x300&maptype=satellite&path=color:0x${primaryColor}ff|weight:3|fillcolor:0x${primaryColor}40|${pathPoints}&markers=color:white|${center.lat},${center.lng}&key=${apiKey}`
  }

  // Geocode address using Nominatim (free, no API key required)
  const geocodeAddress = async (address: string): Promise<{lat: number, lng: number} | null> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`,
        { headers: { 'User-Agent': 'TysonsTechSolutions Demo' } }
      )
      const data = await response.json()
      if (data && data[0]) {
        return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) }
      }
    } catch (e) {
      console.log('Geocoding failed:', e)
    }
    return null
  }

  // Load Google Maps script
  const loadGoogleMaps = (): Promise<boolean> => {
    return new Promise((resolve) => {
      // Check if API key exists
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      if (!apiKey) {
        resolve(false)
        return
      }

      if (window.google?.maps) {
        resolve(true)
        return
      }

      // Check if script is already loading
      const existingScript = document.querySelector('script[src*="maps.googleapis.com"]')
      if (existingScript) {
        const checkLoaded = setInterval(() => {
          if (window.google?.maps) {
            clearInterval(checkLoaded)
            resolve(true)
          }
        }, 100)
        setTimeout(() => { clearInterval(checkLoaded); resolve(false) }, 10000)
        return
      }

      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry,drawing`
      script.async = true
      script.defer = true
      document.head.appendChild(script)

      script.onload = () => {
        const checkLoaded = setInterval(() => {
          if (window.google?.maps) {
            clearInterval(checkLoaded)
            resolve(true)
          }
        }, 100)
        setTimeout(() => { clearInterval(checkLoaded); resolve(false) }, 10000)
      }
      script.onerror = () => resolve(false)
    })
  }

  // Initialize map with address
  const initializeMap = async () => {
    const mapsLoaded = await loadGoogleMaps()

    if (!mapsLoaded || !window.google?.maps || !mapContainerRef.current) {
      setMapLoaded(false)
      setMapError(true)
      return
    }

    setMapError(false)

    const google = window.google

    // Use already geocoded coordinates if available, otherwise geocode
    let center = propertyCoords || geocodedLocation.current || { lat: 38.3170, lng: -88.9031 }

    if (!propertyCoords && !geocodedLocation.current) {
      // Geocode the address if we don't have coordinates yet
      const geocoder = new google.maps.Geocoder()
      try {
        const results = await new Promise<GeocoderResult[]>((resolve, reject) => {
          geocoder.geocode({ address: bookingData.address }, (results, status) => {
            if (status === 'OK' && results?.length > 0) {
              resolve(results)
            } else {
              reject(status)
            }
          })
        })

        if (results[0]) {
          center = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
          }
          geocodedLocation.current = center
        }
      } catch (e) {
        console.log('Geocoding failed, using default location', e)
      }
    }

    // Create the map
    const map = new google.maps.Map(mapContainerRef.current, {
      center,
      zoom: 20,
      mapTypeId: 'satellite',
      disableDefaultUI: true,
      zoomControl: true,
      gestureHandling: 'greedy',
    })
    mapRef.current = map

    // Add address marker
    new google.maps.Marker({
      position: center,
      map: map,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: '#ffffff',
        fillOpacity: 1,
        strokeColor: colors.primary,
        strokeWeight: 3,
      },
      title: 'Service Address'
    })

    // Helper function to update area from polygon
    const updateAreaFromPolygon = (polygon: Polygon) => {
      if (!window.google?.maps?.geometry) return
      const area = window.google.maps.geometry.spherical.computeArea(polygon.getPath())
      const sqft = Math.round(area * 10.7639) // Convert sq meters to sq ft
      setDrawnArea(sqft)
    }

    // If we have AI polygon points, pre-draw the polygon for editing
    if (aiPolygonPoints.length > 0) {
      const polygon = new google.maps.Polygon({
        paths: aiPolygonPoints,
        map: map,
        fillColor: colors.primary,
        fillOpacity: 0.35,
        strokeColor: colors.primary,
        strokeWeight: 3,
        strokeOpacity: 1,
        clickable: true,
        editable: true,
        draggable: true,
      })
      polygonRef.current = polygon

      // Set initial drawn area
      updateAreaFromPolygon(polygon)

      // Listen for edits on the pre-drawn polygon
      const path = polygon.getPath()
      google.maps.event.addListener(path as object, 'set_at', () => updateAreaFromPolygon(polygon))
      google.maps.event.addListener(path as object, 'insert_at', () => updateAreaFromPolygon(polygon))
    }

    // Create drawing manager for new polygons (only if no pre-drawn polygon)
    const drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: aiPolygonPoints.length > 0 ? null : google.maps.drawing.OverlayType.POLYGON,
      drawingControl: false,
      polygonOptions: {
        fillColor: colors.primary,
        fillOpacity: 0.35,
        strokeColor: colors.primary,
        strokeWeight: 3,
        strokeOpacity: 1,
        clickable: true,
        editable: true,
        draggable: true,
      },
    })
    drawingManager.setMap(map)
    drawingManagerRef.current = drawingManager

    // Listen for new polygon completion
    google.maps.event.addListener(drawingManager as object, 'polygoncomplete', ((polygon: Polygon) => {
      // Remove previous polygon if exists
      if (polygonRef.current) {
        polygonRef.current.setMap(null)
      }
      polygonRef.current = polygon

      updateAreaFromPolygon(polygon)

      // Listen for edits
      const path = polygon.getPath()
      google.maps.event.addListener(path as object, 'set_at', () => updateAreaFromPolygon(polygon))
      google.maps.event.addListener(path as object, 'insert_at', () => updateAreaFromPolygon(polygon))

      // Stop drawing mode
      drawingManager.setDrawingMode(null)
    }) as (...args: never[]) => void)

    setMapLoaded(true)
  }

  // Show map when entering map step
  useEffect(() => {
    if (showMap && bookingData.address) {
      setMapLoaded(false)
      setDrawnArea(null)
      initializeMap()
    }
  }, [showMap])

  const clearDrawing = () => {
    if (polygonRef.current) {
      polygonRef.current.setMap(null)
      polygonRef.current = null
    }
    setDrawnArea(null)
    if (drawingManagerRef.current && window.google?.maps?.drawing) {
      drawingManagerRef.current.setDrawingMode(window.google.maps.drawing.OverlayType.POLYGON)
    }
  }

  // Step Handlers
  const handleServiceSelect = async (serviceId: string) => {
    const service = config.services.find(s => s.id === serviceId)!
    setBookingData(prev => ({
      ...prev,
      service: serviceId,
      serviceName: service.name,
      serviceEmoji: service.emoji
    }))
    addUserMessage(`${service.emoji} ${service.name}`)
    await addBotMessage("What type of property is this for?")
    setStep(STEPS.PROJECT_TYPE)
  }

  const handleProjectSelect = async (projectId: string) => {
    const project = config.projectTypes.find(p => p.id === projectId)!
    const discount = project.discount || 0
    setBookingData(prev => ({
      ...prev,
      projectType: projectId,
      projectTypeName: project.label,
      discount
    }))

    let msg = `${project.emoji} ${project.label}`
    if (discount > 0) msg += ` (${Math.round(discount * 100)}% discount!)`
    addUserMessage(msg)

    await addBotMessage("What's the service address?")
    setStep(STEPS.ADDRESS)
  }

  const handleAddressSubmit = async () => {
    if (!inputValue.trim()) return
    const address = inputValue.trim()
    setBookingData(prev => ({ ...prev, address }))
    addUserMessage(address)
    setInputValue('')

    const service = config.services.find(s => s.id === bookingData.service)

    // For area-based services, show map measurement
    if (service?.unit === 'sqft' && config.useMapMeasurement) {
      setStep(STEPS.ANALYZING)
      await addBotMessage("🛰️ Analyzing satellite imagery...")

      // Geocode the address
      const coords = await geocodeAddress(address)
      if (coords) {
        setPropertyCoords(coords)
        geocodedLocation.current = coords
      }

      // Simulate AI analysis time
      await new Promise(r => setTimeout(r, 1000))

      // Generate a realistic estimate based on property type
      let estimatedSqFt = 0
      if (bookingData.projectType === 'residential') {
        estimatedSqFt = Math.floor(Math.random() * 3000) + 1500 // 1500-4500 sq ft for residential
      } else {
        estimatedSqFt = Math.floor(Math.random() * 20000) + 5000 // 5000-25000 sq ft for commercial
      }

      setAiEstimatedArea(estimatedSqFt)

      // Generate polygon for the estimated area
      if (coords) {
        const polygon = generatePolygonForArea(coords, estimatedSqFt)
        setAiPolygonPoints(polygon)
      }

      const estimate = calculateEstimate(estimatedSqFt, bookingData.service, bookingData.discount)
      setBookingData(prev => ({
        ...prev,
        measurement: estimatedSqFt,
        measurementLabel: `${estimatedSqFt.toLocaleString()} sq ft`,
        estimateLow: estimate.low,
        estimateHigh: estimate.high
      }))

      await addBotMessage(`Found it! I estimated approximately ${estimatedSqFt.toLocaleString()} sq ft.\n\n💰 Estimate: $${estimate.low.toLocaleString()} - $${estimate.high.toLocaleString()}`)
      setStep(STEPS.CONFIRM_MEASUREMENT)
    } else if (service?.unit === 'each' && config.measurementType === 'none') {
      // Fixed price services
      const estimate = calculateEstimate(1, bookingData.service, bookingData.discount)
      setBookingData(prev => ({
        ...prev,
        measurement: 1,
        measurementLabel: service.name,
        estimateLow: estimate.low,
        estimateHigh: estimate.high
      }))

      if (config.askCondition && config.conditions) {
        await addBotMessage("What's the current condition?")
        setStep(STEPS.CONDITION)
      } else {
        await addBotMessage(`💰 Estimate: $${estimate.low.toLocaleString()} - $${estimate.high.toLocaleString()}\n\nWhen would you like to schedule?`)
        setStep(STEPS.DATE)
      }
    } else {
      // Manual measurement for linear ft, etc.
      await addBotMessage(service?.unit === 'linear_ft' ? "How many linear feet?" : "What's the approximate size?")
      setStep(STEPS.MANUAL_MEASURE)
    }
  }

  const handleAcceptMeasurement = async () => {
    addUserMessage(`✓ ${bookingData.measurement.toLocaleString()} sq ft looks right`)

    if (config.askCondition && config.conditions) {
      await addBotMessage("What's the current condition?")
      setStep(STEPS.CONDITION)
    } else {
      await addBotMessage("When would you like to schedule?")
      setStep(STEPS.DATE)
    }
  }

  const handleOpenMap = () => {
    setShowMap(true)
    setMapError(false)
    setMapLoaded(false)
    setStep(STEPS.MAP_MEASURE)
  }

  const handleMapConfirm = async (overrideArea?: number) => {
    const areaToUse = overrideArea || drawnArea
    if (!areaToUse) return
    setShowMap(false)
    setManualAreaInput('')

    const estimate = calculateEstimate(areaToUse, bookingData.service, bookingData.discount)
    setBookingData(prev => ({
      ...prev,
      measurement: areaToUse,
      measurementLabel: `${areaToUse.toLocaleString()} sq ft`,
      estimateLow: estimate.low,
      estimateHigh: estimate.high
    }))

    addUserMessage(`📐 ${areaToUse.toLocaleString()} sq ft measured`)
    await addBotMessage(`💰 Estimate: $${estimate.low.toLocaleString()} - $${estimate.high.toLocaleString()}`)

    if (config.askCondition && config.conditions) {
      await addBotMessage("What's the current condition?")
      setStep(STEPS.CONDITION)
    } else {
      await addBotMessage("When would you like to schedule?")
      setStep(STEPS.DATE)
    }
  }

  const handleManualMeasurement = async () => {
    const value = parseInt(inputValue.trim().replace(/,/g, ''))
    if (isNaN(value) || value <= 0) {
      await addBotMessage("Please enter a valid number.")
      return
    }
    setInputValue('')

    const unit = getMeasurementUnit()
    const estimate = calculateEstimate(value, bookingData.service, bookingData.discount)

    setBookingData(prev => ({
      ...prev,
      measurement: value,
      measurementLabel: `${value.toLocaleString()}${unit ? ' ' + unit : ''}`,
      estimateLow: estimate.low,
      estimateHigh: estimate.high
    }))

    addUserMessage(`${value.toLocaleString()}${unit ? ' ' + unit : ''}`)
    await addBotMessage(`💰 Estimate: $${estimate.low.toLocaleString()} - $${estimate.high.toLocaleString()}`)

    if (config.askCondition && config.conditions) {
      await addBotMessage("What's the current condition?")
      setStep(STEPS.CONDITION)
    } else {
      await addBotMessage("When would you like to schedule?")
      setStep(STEPS.DATE)
    }
  }

  const handleConditionSelect = async (conditionId: string) => {
    const condition = config.conditions?.find(c => c.id === conditionId)
    if (!condition) return

    setBookingData(prev => ({ ...prev, condition: conditionId, conditionLabel: condition.label }))
    addUserMessage(condition.label)

    let newLow = bookingData.estimateLow
    let newHigh = bookingData.estimateHigh

    if (condition.adjustment !== 0) {
      newLow = Math.round(bookingData.estimateLow * (1 + condition.adjustment))
      newHigh = Math.round(bookingData.estimateHigh * (1 + condition.adjustment))
      setBookingData(prev => ({ ...prev, estimateLow: newLow, estimateHigh: newHigh }))
      await addBotMessage(`Updated estimate: $${newLow.toLocaleString()} - $${newHigh.toLocaleString()}\n\nWhen would you like to schedule?`)
    } else {
      await addBotMessage("When would you like to schedule?")
    }
    setStep(STEPS.DATE)
  }

  const handleDateSelect = async (label: string, value: string) => {
    setBookingData(prev => ({ ...prev, preferredDate: value, preferredDateLabel: label }))
    addUserMessage(label)
    await addBotMessage("Last step! Your name and phone number?")
    setStep(STEPS.CONTACT)
  }

  const handleContactSubmit = async () => {
    const value = inputValue.trim()
    if (!value) return
    setInputValue('')

    const phoneMatch = value.match(/[\d\-\(\)\s\.]{10,}/)
    const phone = phoneMatch ? phoneMatch[0].replace(/\D/g, '') : ''
    const name = value.replace(phoneMatch?.[0] || '', '').replace(/[,]/g, '').trim()

    if (name && phone.length >= 10) {
      setBookingData(prev => ({ ...prev, name, phone }))
      addUserMessage(`${name}, ${formatPhone(phone)}`)
      await addBotMessage("Here's your quote summary:")
      setStep(STEPS.SUMMARY)
    } else {
      await addBotMessage("Please include your name and 10-digit phone number.\n\nExample: John Smith 555-123-4567")
    }
  }

  const formatPhone = (phone: string) => {
    if (phone.length === 10) {
      return `(${phone.slice(0,3)}) ${phone.slice(3,6)}-${phone.slice(6)}`
    }
    return phone
  }

  const handleConfirmBooking = async () => {
    addUserMessage("Submit Request")
    setIsTyping(true)
    await new Promise(r => setTimeout(r, 1000))
    setIsTyping(false)

    await addBotMessage(`Request submitted! ✓\n\n${config.businessName} will contact you at ${formatPhone(bookingData.phone)} to confirm your appointment.\n\nThank you for choosing us!`)
    setStep(STEPS.COMPLETE)
  }

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    if (step === STEPS.ADDRESS) handleAddressSubmit()
    else if (step === STEPS.MANUAL_MEASURE) handleManualMeasurement()
    else if (step === STEPS.CONTACT) handleContactSubmit()
  }

  const resetChat = () => {
    setStep(STEPS.SERVICE)
    setMessages([])
    setShowMap(false)
    setMapLoaded(false)
    setMapError(false)
    setDrawnArea(null)
    setAiEstimatedArea(null)
    setManualAreaInput('')
    setAiPolygonPoints([])
    setPropertyCoords(null)
    setBookingData({
      service: '',
      serviceName: '',
      serviceEmoji: '',
      projectType: '',
      projectTypeName: '',
      discount: 0,
      address: '',
      measurement: 0,
      measurementLabel: '',
      condition: '',
      conditionLabel: '',
      estimateLow: 0,
      estimateHigh: 0,
      preferredDate: '',
      preferredDateLabel: '',
      name: '',
      phone: '',
    })
  }

  const getInputPlaceholder = () => {
    if (step === STEPS.ADDRESS) return "123 Main St, City, State"
    if (step === STEPS.MANUAL_MEASURE) {
      const service = config.services.find(s => s.id === bookingData.service)
      if (service?.unit === 'sqft') return "e.g., 1500"
      if (service?.unit === 'linear_ft') return "e.g., 200"
      if (service?.unit === 'each') return "e.g., 5"
      return "Enter amount"
    }
    if (step === STEPS.CONTACT) return "John Smith 555-123-4567"
    return ""
  }

  // Inline styles
  const containerStyle: React.CSSProperties = inline ? {
    width: '100%',
    height: '100%',
    backgroundColor: colors.background,
    borderRadius: '0',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  } : {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    width: '380px',
    maxWidth: 'calc(100vw - 48px)',
    height: '600px',
    maxHeight: 'calc(100vh - 100px)',
    backgroundColor: colors.background,
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1000,
    overflow: 'hidden',
    boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
  }

  // Floating button (only when not inline)
  if (!inline && !isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: colors.primary,
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          fontSize: '28px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          zIndex: 1000,
        }}
      >
        💬
      </button>
    )
  }

  if (!isOpen) return null

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        backgroundColor: colors.primary,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: 0,
      }}>
        <div>
          <div style={{ fontWeight: 'bold', color: 'white', fontSize: '16px' }}>{config.businessName}</div>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>{config.tagline}</div>
        </div>
        {!inline && (
          <button
            onClick={() => setIsOpen(false)}
            style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '24px', padding: '4px' }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Map Overlay */}
      {showMap && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: colors.background,
          display: 'flex',
          flexDirection: 'column',
          zIndex: 20,
        }}>
          {/* Map Header */}
          <div style={{ padding: '16px', borderBottom: `1px solid ${colors.border}`, flexShrink: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ color: 'white', fontWeight: 'bold', fontSize: '16px' }}>
                  {aiPolygonPoints.length > 0 ? 'Adjust Your Area' : 'Draw Your Area'}
                </div>
                <div style={{ color: colors.textMuted, fontSize: '12px' }}>
                  {aiPolygonPoints.length > 0
                    ? 'Drag corners to adjust the boundary'
                    : 'Tap to place points, close the shape'}
                </div>
              </div>
              <button
                onClick={() => { setShowMap(false); setStep(STEPS.CONFIRM_MEASUREMENT); }}
                style={{ background: 'none', border: 'none', color: colors.textMuted, cursor: 'pointer', fontSize: '20px' }}
              >
                ✕
              </button>
            </div>
          </div>

          {/* Map Container */}
          <div
            ref={mapContainerRef}
            style={{
              flex: 1,
              backgroundColor: colors.cardBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {!mapLoaded && !mapError && (
              <div style={{ color: colors.textMuted, textAlign: 'center' }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>🗺️</div>
                <div>Loading satellite view...</div>
              </div>
            )}
            {mapError && (
              <div style={{ color: 'white', textAlign: 'center', padding: '20px' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>📐</div>
                <div style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '8px' }}>
                  Manual Measurement
                </div>
                <div style={{ color: colors.textMuted, fontSize: '14px', marginBottom: '20px' }}>
                  AI estimated: {aiEstimatedArea?.toLocaleString() || bookingData.measurement.toLocaleString()} sq ft
                </div>
                <div style={{ maxWidth: '200px', margin: '0 auto' }}>
                  <input
                    type="text"
                    value={manualAreaInput}
                    onChange={(e) => setManualAreaInput(e.target.value.replace(/[^\d]/g, ''))}
                    placeholder="Enter sq ft"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      backgroundColor: colors.background,
                      border: `1px solid ${colors.border}`,
                      borderRadius: '12px',
                      color: 'white',
                      fontSize: '18px',
                      textAlign: 'center',
                      outline: 'none',
                    }}
                  />
                  <div style={{ color: colors.textMuted, fontSize: '12px', marginTop: '8px' }}>
                    Enter your corrected area in square feet
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Map Footer */}
          <div style={{ padding: '16px', borderTop: `1px solid ${colors.border}`, flexShrink: 0 }}>
            {mapError ? (
              // Manual input mode
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => { setShowMap(false); setStep(STEPS.CONFIRM_MEASUREMENT); setManualAreaInput(''); }}
                  style={{
                    flex: 1,
                    padding: '14px',
                    backgroundColor: colors.cardBg,
                    border: `1px solid ${colors.border}`,
                    borderRadius: '12px',
                    color: 'white',
                    cursor: 'pointer',
                    fontWeight: '500',
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const area = parseInt(manualAreaInput)
                    if (area > 0) {
                      handleMapConfirm(area)
                    }
                  }}
                  disabled={!manualAreaInput || parseInt(manualAreaInput) <= 0}
                  style={{
                    flex: 1,
                    padding: '14px',
                    backgroundColor: manualAreaInput && parseInt(manualAreaInput) > 0 ? colors.primary : colors.cardBg,
                    border: 'none',
                    borderRadius: '12px',
                    color: manualAreaInput && parseInt(manualAreaInput) > 0 ? 'white' : colors.textMuted,
                    cursor: manualAreaInput && parseInt(manualAreaInput) > 0 ? 'pointer' : 'not-allowed',
                    fontWeight: 'bold',
                  }}
                >
                  Use This Area
                </button>
              </div>
            ) : (
              <>
                {drawnArea ? (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div>
                      <div style={{ color: colors.textMuted, fontSize: '12px' }}>Measured Area</div>
                      <div style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
                        {drawnArea.toLocaleString()} sq ft
                      </div>
                    </div>
                    <button
                      onClick={clearDrawing}
                      style={{
                        background: 'none',
                        border: `1px solid ${colors.border}`,
                        color: colors.textMuted,
                        cursor: 'pointer',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        fontSize: '14px',
                      }}
                    >
                      Redraw
                    </button>
                  </div>
                ) : (
                  <div style={{ color: colors.textMuted, textAlign: 'center', marginBottom: '12px', fontSize: '14px' }}>
                    {mapLoaded ? 'Draw the area you need serviced' : 'Loading map...'}
                  </div>
                )}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => { setShowMap(false); setStep(STEPS.CONFIRM_MEASUREMENT); }}
                    style={{
                      flex: 1,
                      padding: '14px',
                      backgroundColor: colors.cardBg,
                      border: `1px solid ${colors.border}`,
                      borderRadius: '12px',
                      color: 'white',
                      cursor: 'pointer',
                      fontWeight: '500',
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleMapConfirm()}
                    disabled={!drawnArea}
                    style={{
                      flex: 1,
                      padding: '14px',
                      backgroundColor: drawnArea ? colors.primary : colors.cardBg,
                      border: 'none',
                      borderRadius: '12px',
                      color: drawnArea ? 'white' : colors.textMuted,
                      cursor: drawnArea ? 'pointer' : 'not-allowed',
                      fontWeight: 'bold',
                    }}
                  >
                    Use This Area
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Messages */}
      <div ref={messagesContainerRef} style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: 'flex',
            justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start',
            marginBottom: '12px',
          }}>
            <div style={{
              maxWidth: '85%',
              padding: '12px 16px',
              borderRadius: msg.type === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              backgroundColor: msg.type === 'user' ? colors.primary : colors.cardBg,
              color: 'white',
              whiteSpace: 'pre-line',
              fontSize: '14px',
              lineHeight: '1.5',
            }}>
              {msg.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '12px' }}>
            <div style={{
              padding: '12px 16px',
              borderRadius: '18px 18px 18px 4px',
              backgroundColor: colors.cardBg,
            }}>
              <div style={{ display: 'flex', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: colors.textMuted, animation: 'bounce 1s infinite' }} />
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: colors.textMuted, animation: 'bounce 1s infinite 0.1s' }} />
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: colors.textMuted, animation: 'bounce 1s infinite 0.2s' }} />
              </div>
            </div>
          </div>
        )}

        {/* SERVICE SELECTION */}
        {!isTyping && step === STEPS.SERVICE && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {config.services.map(service => (
              <button
                key={service.id}
                onClick={() => handleServiceSelect(service.id)}
                style={{
                  padding: '14px 16px',
                  backgroundColor: colors.cardBg,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '12px',
                  color: 'white',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'all 0.2s',
                }}
                onMouseOver={e => {
                  e.currentTarget.style.borderColor = colors.primary
                  e.currentTarget.style.backgroundColor = colors.border
                }}
                onMouseOut={e => {
                  e.currentTarget.style.borderColor = colors.border
                  e.currentTarget.style.backgroundColor = colors.cardBg
                }}
              >
                <span style={{ fontSize: '24px' }}>{service.emoji}</span>
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '2px' }}>{service.name}</div>
                  <div style={{ fontSize: '12px', color: colors.textMuted }}>{service.description}</div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* PROJECT TYPE */}
        {!isTyping && step === STEPS.PROJECT_TYPE && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {config.projectTypes.map(project => (
              <button
                key={project.id}
                onClick={() => handleProjectSelect(project.id)}
                style={{
                  padding: '14px 16px',
                  backgroundColor: colors.cardBg,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '12px',
                  color: 'white',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  position: 'relative',
                  transition: 'all 0.2s',
                }}
                onMouseOver={e => {
                  e.currentTarget.style.borderColor = colors.primary
                  e.currentTarget.style.backgroundColor = colors.border
                }}
                onMouseOut={e => {
                  e.currentTarget.style.borderColor = colors.border
                  e.currentTarget.style.backgroundColor = colors.cardBg
                }}
              >
                {project.discount && project.discount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '12px',
                    backgroundColor: colors.primary,
                    color: 'white',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    fontSize: '11px',
                    fontWeight: 'bold',
                  }}>
                    {Math.round(project.discount * 100)}% OFF
                  </span>
                )}
                <span style={{ fontSize: '24px' }}>{project.emoji}</span>
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '2px' }}>{project.label}</div>
                  <div style={{ fontSize: '12px', color: colors.textMuted }}>{project.description}</div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* CONFIRM MEASUREMENT */}
        {!isTyping && step === STEPS.CONFIRM_MEASUREMENT && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Satellite Map Preview */}
            {propertyCoords && aiPolygonPoints.length > 0 && (
              <div style={{
                borderRadius: '12px',
                overflow: 'hidden',
                border: `2px solid ${colors.primary}`,
                backgroundColor: colors.cardBg,
              }}>
                {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? (
                  <img
                    src={getStaticMapUrl(propertyCoords, aiPolygonPoints) || ''}
                    alt="Property satellite view with estimated area"
                    style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }}
                    onError={(e) => {
                      // Hide image on error
                      (e.target as HTMLImageElement).style.display = 'none'
                    }}
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '150px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.cardBg,
                  }}>
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>🗺️</div>
                    <div style={{ color: colors.textMuted, fontSize: '12px', textAlign: 'center', padding: '0 16px' }}>
                      Satellite preview would appear here
                    </div>
                  </div>
                )}
                <div style={{
                  padding: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: `1px solid ${colors.border}`,
                }}>
                  <div>
                    <div style={{ color: colors.textMuted, fontSize: '11px' }}>AI ESTIMATED AREA</div>
                    <div style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>
                      {aiEstimatedArea?.toLocaleString()} sq ft
                    </div>
                  </div>
                  <div style={{
                    backgroundColor: `${colors.primary}30`,
                    color: colors.primary,
                    padding: '4px 10px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: '600',
                  }}>
                    🤖 AI Detected
                  </div>
                </div>
              </div>
            )}
            {/* Fallback when no coordinates */}
            {!propertyCoords && (
              <div style={{
                padding: '16px',
                backgroundColor: colors.cardBg,
                borderRadius: '12px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>📐</div>
                <div style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>
                  {aiEstimatedArea?.toLocaleString()} sq ft
                </div>
                <div style={{ color: colors.textMuted, fontSize: '12px' }}>Estimated area</div>
              </div>
            )}
            <button
              onClick={handleAcceptMeasurement}
              style={{
                padding: '16px',
                backgroundColor: colors.primary,
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              ✓ Looks Good - Continue
            </button>
            <button
              onClick={handleOpenMap}
              style={{
                padding: '16px',
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.border}`,
                borderRadius: '12px',
                color: 'white',
                cursor: 'pointer',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              📐 Adjust on Map
            </button>
          </div>
        )}

        {/* CONDITION */}
        {!isTyping && step === STEPS.CONDITION && config.conditions && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {config.conditions.map(condition => (
              <button
                key={condition.id}
                onClick={() => handleConditionSelect(condition.id)}
                style={{
                  padding: '14px 12px',
                  backgroundColor: colors.cardBg,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '12px',
                  color: 'white',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                }}
                onMouseOver={e => {
                  e.currentTarget.style.borderColor = colors.primary
                  e.currentTarget.style.backgroundColor = colors.border
                }}
                onMouseOut={e => {
                  e.currentTarget.style.borderColor = colors.border
                  e.currentTarget.style.backgroundColor = colors.cardBg
                }}
              >
                <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '2px' }}>{condition.label}</div>
                <div style={{ fontSize: '11px', color: colors.textMuted }}>{condition.description}</div>
              </button>
            ))}
          </div>
        )}

        {/* DATE */}
        {!isTyping && step === STEPS.DATE && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {getAvailableDates().map(date => (
              <button
                key={date.value}
                onClick={() => handleDateSelect(date.label, date.value)}
                style={{
                  padding: '14px 10px',
                  backgroundColor: colors.cardBg,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '12px',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '500',
                  transition: 'all 0.2s',
                }}
                onMouseOver={e => {
                  e.currentTarget.style.borderColor = colors.primary
                  e.currentTarget.style.backgroundColor = colors.border
                }}
                onMouseOut={e => {
                  e.currentTarget.style.borderColor = colors.border
                  e.currentTarget.style.backgroundColor = colors.cardBg
                }}
              >
                {date.label}
              </button>
            ))}
          </div>
        )}

        {/* SUMMARY */}
        {!isTyping && step === STEPS.SUMMARY && (
          <div>
            <div style={{ backgroundColor: colors.cardBg, borderRadius: '12px', padding: '16px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', paddingBottom: '12px', borderBottom: `1px solid ${colors.border}` }}>
                <span style={{ color: colors.textMuted }}>Service</span>
                <span style={{ color: 'white', fontWeight: '500' }}>{bookingData.serviceEmoji} {bookingData.serviceName}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', paddingBottom: '12px', borderBottom: `1px solid ${colors.border}` }}>
                <span style={{ color: colors.textMuted }}>Property</span>
                <span style={{ color: 'white', fontWeight: '500' }}>{bookingData.projectTypeName}</span>
              </div>
              {bookingData.measurement > 0 && bookingData.measurementLabel && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', paddingBottom: '12px', borderBottom: `1px solid ${colors.border}` }}>
                  <span style={{ color: colors.textMuted }}>Size</span>
                  <span style={{ color: 'white', fontWeight: '500' }}>{bookingData.measurementLabel}</span>
                </div>
              )}
              {bookingData.conditionLabel && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', paddingBottom: '12px', borderBottom: `1px solid ${colors.border}` }}>
                  <span style={{ color: colors.textMuted }}>Condition</span>
                  <span style={{ color: 'white', fontWeight: '500' }}>{bookingData.conditionLabel}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', paddingBottom: '12px', borderBottom: `1px solid ${colors.border}` }}>
                <span style={{ color: colors.textMuted }}>Date</span>
                <span style={{ color: 'white', fontWeight: '500' }}>{bookingData.preferredDateLabel}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', paddingBottom: '12px', borderBottom: `1px solid ${colors.border}` }}>
                <span style={{ color: colors.textMuted }}>Contact</span>
                <span style={{ color: 'white', fontWeight: '500', textAlign: 'right' }}>
                  {bookingData.name}<br/>
                  <span style={{color: colors.textMuted, fontSize: '13px'}}>{formatPhone(bookingData.phone)}</span>
                </span>
              </div>
              {bookingData.estimateLow > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '4px' }}>
                  <span style={{ color: 'white', fontWeight: 'bold', fontSize: '15px' }}>Estimate</span>
                  <span style={{ color: colors.primary, fontWeight: 'bold', fontSize: '18px' }}>
                    ${bookingData.estimateLow.toLocaleString()} - ${bookingData.estimateHigh.toLocaleString()}
                  </span>
                </div>
              )}
            </div>
            <button
              onClick={handleConfirmBooking}
              style={{
                width: '100%',
                padding: '16px',
                backgroundColor: colors.secondary,
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '16px',
              }}
            >
              Submit Request →
            </button>
          </div>
        )}

        {/* COMPLETE */}
        {!isTyping && step === STEPS.COMPLETE && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
            <button
              onClick={resetChat}
              style={{
                padding: '12px 24px',
                backgroundColor: colors.primary,
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                cursor: 'pointer',
                fontWeight: '500',
              }}
            >
              Start New Quote
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      {(step === STEPS.ADDRESS || step === STEPS.MANUAL_MEASURE || step === STEPS.CONTACT) && (
        <div style={{ padding: '16px', borderTop: `1px solid ${colors.border}`, flexShrink: 0 }}>
          <form onSubmit={handleInputSubmit}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={getInputPlaceholder()}
                style={{
                  flex: 1,
                  padding: '14px 16px',
                  backgroundColor: colors.cardBg,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '12px',
                  color: 'white',
                  fontSize: '14px',
                  outline: 'none',
                }}
                autoFocus
              />
              <button
                type="submit"
                style={{
                  padding: '14px 20px',
                  backgroundColor: colors.primary,
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                }}
              >
                →
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Footer */}
      <div style={{
        padding: '10px',
        textAlign: 'center',
        borderTop: `1px solid ${colors.border}`,
        flexShrink: 0,
      }}>
        <span style={{ color: colors.textMuted, fontSize: '12px' }}>
          Demo • Powered by TysonsTechSolutions
        </span>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  )
}

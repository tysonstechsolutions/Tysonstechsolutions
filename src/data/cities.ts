// Top 200 US cities by population for programmatic SEO
// Enhanced with unique content for better indexing

// City-specific data for unique content generation
interface CityData {
  slug: string;
  name: string;
  state: string;
  stateFullName: string;
  population?: string;
  businessCount?: string;
  topIndustries?: string[];
  economicHighlight?: string;
  techScene?: string;
}

// State-level data for generating unique content
export const stateData: Record<string, { timezone: string; region: string; businessClimate: string }> = {
  NY: { timezone: "Eastern", region: "Northeast", businessClimate: "Major financial and tech hub with diverse business ecosystem" },
  CA: { timezone: "Pacific", region: "West Coast", businessClimate: "Innovation leader with strong tech, entertainment, and agriculture sectors" },
  IL: { timezone: "Central", region: "Midwest", businessClimate: "Central hub for logistics, manufacturing, and professional services" },
  TX: { timezone: "Central", region: "South", businessClimate: "Business-friendly environment with no state income tax and rapid growth" },
  AZ: { timezone: "Mountain", region: "Southwest", businessClimate: "Growing tech corridor with strong healthcare and tourism industries" },
  PA: { timezone: "Eastern", region: "Northeast", businessClimate: "Historic business center with healthcare, education, and manufacturing strengths" },
  FL: { timezone: "Eastern", region: "Southeast", businessClimate: "Tourism powerhouse with growing tech and healthcare sectors" },
  OH: { timezone: "Eastern", region: "Midwest", businessClimate: "Manufacturing heritage evolving into healthcare and tech innovation" },
  NC: { timezone: "Eastern", region: "Southeast", businessClimate: "Research Triangle drives tech growth alongside banking sector" },
  IN: { timezone: "Eastern", region: "Midwest", businessClimate: "Strong manufacturing base with growing life sciences sector" },
  WA: { timezone: "Pacific", region: "Pacific Northwest", businessClimate: "Tech giant headquarters with strong aerospace and retail sectors" },
  CO: { timezone: "Mountain", region: "Mountain West", businessClimate: "Outdoor industry hub with booming tech and cannabis sectors" },
  DC: { timezone: "Eastern", region: "Mid-Atlantic", businessClimate: "Government contracting and nonprofit center with growing tech scene" },
  MA: { timezone: "Eastern", region: "New England", businessClimate: "Biotech and education powerhouse with strong financial services" },
  TN: { timezone: "Central", region: "South", businessClimate: "Healthcare capital with growing entertainment and tech industries" },
  MI: { timezone: "Eastern", region: "Midwest", businessClimate: "Automotive heritage transforming into mobility and tech innovation" },
  OK: { timezone: "Central", region: "South Central", businessClimate: "Energy sector leader diversifying into aerospace and biotech" },
  OR: { timezone: "Pacific", region: "Pacific Northwest", businessClimate: "Sustainable business leader with strong tech and outdoor industries" },
  NV: { timezone: "Pacific", region: "Southwest", businessClimate: "Entertainment and hospitality hub with growing tech presence" },
  KY: { timezone: "Eastern", region: "South", businessClimate: "Logistics hub with strong bourbon, automotive, and healthcare industries" },
  MD: { timezone: "Eastern", region: "Mid-Atlantic", businessClimate: "Federal contracting center with biotech and cybersecurity strengths" },
  WI: { timezone: "Central", region: "Midwest", businessClimate: "Manufacturing and dairy leader with growing tech ecosystem" },
  NM: { timezone: "Mountain", region: "Southwest", businessClimate: "Research labs drive innovation in energy and defense sectors" },
  GA: { timezone: "Eastern", region: "Southeast", businessClimate: "Logistics and film industry hub with strong fintech growth" },
  MO: { timezone: "Central", region: "Midwest", businessClimate: "Central location drives logistics with strong healthcare and agriculture" },
  NE: { timezone: "Central", region: "Great Plains", businessClimate: "Insurance and agriculture center with stable business environment" },
  VA: { timezone: "Eastern", region: "Mid-Atlantic", businessClimate: "Defense contracting hub with growing tech corridor" },
  MN: { timezone: "Central", region: "Upper Midwest", businessClimate: "Fortune 500 hub with strong healthcare and retail sectors" },
  LA: { timezone: "Central", region: "Gulf Coast", businessClimate: "Energy and maritime industries with unique cultural economy" },
  KS: { timezone: "Central", region: "Great Plains", businessClimate: "Aviation manufacturing center with strong agriculture base" },
  HI: { timezone: "Hawaii", region: "Pacific", businessClimate: "Tourism-driven economy with growing renewable energy sector" },
  NJ: { timezone: "Eastern", region: "Northeast", businessClimate: "Pharmaceutical hub with strong logistics and financial services" },
  AK: { timezone: "Alaska", region: "Pacific Northwest", businessClimate: "Oil and fishing industries with unique wilderness tourism" },
  ID: { timezone: "Mountain", region: "Pacific Northwest", businessClimate: "Tech growth corridor with strong agriculture and outdoor recreation" },
  IA: { timezone: "Central", region: "Midwest", businessClimate: "Insurance and agriculture hub with growing biotech sector" },
  AL: { timezone: "Central", region: "South", businessClimate: "Automotive manufacturing growth with aerospace and healthcare" },
  AR: { timezone: "Central", region: "South", businessClimate: "Retail headquarters hub with growing tech and logistics" },
  UT: { timezone: "Mountain", region: "Mountain West", businessClimate: "Silicon Slopes tech hub with outdoor recreation economy" },
  RI: { timezone: "Eastern", region: "New England", businessClimate: "Design and jewelry hub with growing innovation economy" },
  SD: { timezone: "Central", region: "Great Plains", businessClimate: "Financial services center with no corporate income tax" },
  SC: { timezone: "Eastern", region: "Southeast", businessClimate: "Manufacturing growth with strong automotive and aerospace" },
  CT: { timezone: "Eastern", region: "New England", businessClimate: "Insurance capital with strong financial services and healthcare" },
};

// Industry keywords by state for unique content
export const stateIndustries: Record<string, string[]> = {
  NY: ["Finance", "Media", "Fashion", "Tech Startups", "Healthcare"],
  CA: ["Technology", "Entertainment", "Agriculture", "Biotech", "Aerospace"],
  IL: ["Finance", "Manufacturing", "Logistics", "Healthcare", "Food Processing"],
  TX: ["Energy", "Technology", "Healthcare", "Aerospace", "Agriculture"],
  AZ: ["Healthcare", "Technology", "Tourism", "Aerospace", "Real Estate"],
  PA: ["Healthcare", "Education", "Manufacturing", "Financial Services", "Technology"],
  FL: ["Tourism", "Healthcare", "Real Estate", "Aerospace", "Agriculture"],
  OH: ["Manufacturing", "Healthcare", "Financial Services", "Retail", "Technology"],
  NC: ["Technology", "Banking", "Healthcare", "Manufacturing", "Biotechnology"],
  IN: ["Manufacturing", "Life Sciences", "Logistics", "Agriculture", "Technology"],
  WA: ["Technology", "Aerospace", "Retail", "Healthcare", "Clean Energy"],
  CO: ["Technology", "Aerospace", "Tourism", "Healthcare", "Cannabis"],
  DC: ["Government", "Technology", "Nonprofits", "Legal Services", "Healthcare"],
  MA: ["Biotechnology", "Education", "Healthcare", "Financial Services", "Technology"],
  TN: ["Healthcare", "Music Industry", "Automotive", "Logistics", "Technology"],
  MI: ["Automotive", "Manufacturing", "Healthcare", "Technology", "Agriculture"],
  OK: ["Energy", "Aerospace", "Agriculture", "Healthcare", "Manufacturing"],
  OR: ["Technology", "Outdoor Recreation", "Agriculture", "Manufacturing", "Healthcare"],
  NV: ["Entertainment", "Hospitality", "Mining", "Technology", "Healthcare"],
  KY: ["Logistics", "Automotive", "Healthcare", "Bourbon Industry", "Manufacturing"],
  MD: ["Biotechnology", "Cybersecurity", "Healthcare", "Defense", "Education"],
  WI: ["Manufacturing", "Agriculture", "Healthcare", "Technology", "Tourism"],
  NM: ["Research", "Energy", "Tourism", "Healthcare", "Aerospace"],
  GA: ["Logistics", "Film Industry", "Technology", "Healthcare", "Agriculture"],
  MO: ["Healthcare", "Logistics", "Agriculture", "Manufacturing", "Financial Services"],
  NE: ["Insurance", "Agriculture", "Healthcare", "Technology", "Manufacturing"],
  VA: ["Defense", "Technology", "Healthcare", "Agriculture", "Tourism"],
  MN: ["Healthcare", "Retail", "Financial Services", "Manufacturing", "Technology"],
  LA: ["Energy", "Maritime", "Tourism", "Healthcare", "Agriculture"],
  KS: ["Aviation", "Agriculture", "Healthcare", "Manufacturing", "Technology"],
  HI: ["Tourism", "Military", "Agriculture", "Renewable Energy", "Healthcare"],
  NJ: ["Pharmaceuticals", "Financial Services", "Logistics", "Healthcare", "Technology"],
  AK: ["Oil & Gas", "Fishing", "Tourism", "Healthcare", "Mining"],
  ID: ["Technology", "Agriculture", "Manufacturing", "Tourism", "Healthcare"],
  IA: ["Insurance", "Agriculture", "Manufacturing", "Healthcare", "Biotechnology"],
  AL: ["Automotive", "Aerospace", "Healthcare", "Manufacturing", "Technology"],
  AR: ["Retail", "Agriculture", "Manufacturing", "Healthcare", "Technology"],
  UT: ["Technology", "Healthcare", "Tourism", "Financial Services", "Manufacturing"],
  RI: ["Healthcare", "Education", "Manufacturing", "Tourism", "Financial Services"],
  SD: ["Financial Services", "Agriculture", "Healthcare", "Tourism", "Manufacturing"],
  SC: ["Automotive", "Aerospace", "Tourism", "Manufacturing", "Healthcare"],
  CT: ["Insurance", "Financial Services", "Healthcare", "Manufacturing", "Technology"],
};

// FAQ templates that get customized per city
export const cityFaqTemplates = [
  {
    question: "What web development services do you offer in {city}?",
    answer: "We provide comprehensive web development services for {city} businesses including custom website design, e-commerce solutions, web applications, mobile-responsive design, and ongoing maintenance. Our team understands the local {state} market and builds solutions that help you compete effectively."
  },
  {
    question: "How much does a website cost for a {city} small business?",
    answer: "Website costs vary based on your needs. For {city} small businesses, we offer packages starting at $99/month for basic websites, $199/month for e-commerce sites, and $499/month for custom web applications. All packages include hosting, SSL, and ongoing support."
  },
  {
    question: "Do you provide AI chatbot services in {city}?",
    answer: "Yes! Our AI chatbot solutions are perfect for {city} businesses looking to automate customer service, capture leads 24/7, and improve response times. Our chatbots integrate with your existing website and can be customized for your specific {industry} industry needs."
  },
  {
    question: "How long does it take to build a website for a {city} business?",
    answer: "Most websites for {city} businesses are completed within 2-4 weeks. Complex e-commerce or custom applications may take 4-8 weeks. We work efficiently while ensuring quality, and we keep you updated throughout the process."
  },
  {
    question: "Do you offer SEO services for {city} businesses?",
    answer: "Absolutely! We provide local SEO services specifically optimized for {city} and {stateFullName}. This includes Google Business Profile optimization, local keyword targeting, and content strategies that help you rank higher in local search results."
  }
];

// Testimonial templates that get customized per city
export const testimonialTemplates = [
  {
    text: "TysonsTechSolutions transformed our online presence. As a {industry} business in {city}, we needed a website that would stand out. They delivered beyond our expectations!",
    author: "Local Business Owner",
    role: "{industry} Professional"
  },
  {
    text: "The AI chatbot they built for our {city} {industry} has increased our lead capture by 40%. It handles customer inquiries 24/7 so we never miss an opportunity.",
    author: "Small Business Owner",
    role: "{city} {industry}"
  },
  {
    text: "Working with a team that understands {stateFullName} businesses made all the difference. They knew exactly what our {city} customers needed.",
    author: "Entrepreneur",
    role: "{city} Business Owner"
  }
];

export const cities: CityData[] = [
  // Top 50 metros
  { slug: "new-york", name: "New York", state: "NY", stateFullName: "New York", population: "8.3M", businessCount: "230,000+", topIndustries: ["Finance", "Tech", "Media"], economicHighlight: "The largest city economy in the US with a GDP exceeding $1.5 trillion", techScene: "Silicon Alley is home to thousands of startups and tech giants" },
  { slug: "los-angeles", name: "Los Angeles", state: "CA", stateFullName: "California", population: "3.9M", businessCount: "150,000+", topIndustries: ["Entertainment", "Tech", "Trade"], economicHighlight: "America's entertainment capital with a diverse economy spanning tech to trade", techScene: "Silicon Beach has become a major tech hub with numerous startups" },
  { slug: "chicago", name: "Chicago", state: "IL", stateFullName: "Illinois", population: "2.7M", businessCount: "90,000+", topIndustries: ["Finance", "Manufacturing", "Tech"], economicHighlight: "A major transportation and business hub serving the entire Midwest", techScene: "Growing tech scene with strong fintech and logistics innovation" },
  { slug: "houston", name: "Houston", state: "TX", stateFullName: "Texas", population: "2.3M", businessCount: "85,000+", topIndustries: ["Energy", "Healthcare", "Aerospace"], economicHighlight: "The energy capital of the world with a rapidly diversifying economy", techScene: "Expanding tech sector with focus on energy tech and healthcare IT" },
  { slug: "phoenix", name: "Phoenix", state: "AZ", stateFullName: "Arizona", population: "1.6M", businessCount: "65,000+", topIndustries: ["Tech", "Healthcare", "Finance"], economicHighlight: "One of the fastest-growing metros with strong business incentives", techScene: "Emerging tech hub attracting companies seeking lower costs than California" },
  { slug: "philadelphia", name: "Philadelphia", state: "PA", stateFullName: "Pennsylvania", population: "1.6M", businessCount: "55,000+", topIndustries: ["Healthcare", "Education", "Biotech"], economicHighlight: "Major healthcare and education center with historic business district", techScene: "Growing startup ecosystem with strong university connections" },
  { slug: "san-antonio", name: "San Antonio", state: "TX", stateFullName: "Texas", population: "1.5M", businessCount: "45,000+", topIndustries: ["Military", "Healthcare", "Tourism"], economicHighlight: "Major military presence drives significant economic activity", techScene: "Growing cybersecurity hub with military tech connections" },
  { slug: "san-diego", name: "San Diego", state: "CA", stateFullName: "California", population: "1.4M", businessCount: "50,000+", topIndustries: ["Biotech", "Defense", "Tourism"], economicHighlight: "Leading biotech cluster with strong defense industry presence", techScene: "Thriving biotech and life sciences innovation center" },
  { slug: "dallas", name: "Dallas", state: "TX", stateFullName: "Texas", population: "1.3M", businessCount: "70,000+", topIndustries: ["Finance", "Tech", "Telecom"], economicHighlight: "Corporate headquarters hub with no state income tax advantage", techScene: "Major tech corridor with telecom and fintech leadership" },
  { slug: "san-jose", name: "San Jose", state: "CA", stateFullName: "California", population: "1.0M", businessCount: "35,000+", topIndustries: ["Technology", "Manufacturing", "Research"], economicHighlight: "The capital of Silicon Valley with highest median income in US", techScene: "Global center of technology innovation and venture capital" },
  { slug: "austin", name: "Austin", state: "TX", stateFullName: "Texas", population: "978K", businessCount: "45,000+", topIndustries: ["Technology", "Government", "Education"], economicHighlight: "Silicon Hills has become America's hottest tech destination", techScene: "Major tech hub with Tesla, Apple, Google, and thousands of startups" },
  { slug: "jacksonville", name: "Jacksonville", state: "FL", stateFullName: "Florida", population: "950K", businessCount: "35,000+", topIndustries: ["Logistics", "Finance", "Healthcare"], economicHighlight: "Major port city with strong banking and insurance sectors", techScene: "Growing fintech presence with emphasis on financial services tech" },
  { slug: "fort-worth", name: "Fort Worth", state: "TX", stateFullName: "Texas", population: "918K", businessCount: "30,000+", topIndustries: ["Aerospace", "Manufacturing", "Logistics"], economicHighlight: "Major aerospace hub with growing tech sector", techScene: "Defense tech and manufacturing innovation center" },
  { slug: "columbus", name: "Columbus", state: "OH", stateFullName: "Ohio", population: "905K", businessCount: "35,000+", topIndustries: ["Insurance", "Retail", "Education"], economicHighlight: "State capital with diverse economy and major university presence", techScene: "Emerging Midwest tech hub with strong startup ecosystem" },
  { slug: "charlotte", name: "Charlotte", state: "NC", stateFullName: "North Carolina", population: "875K", businessCount: "40,000+", topIndustries: ["Banking", "Energy", "Tech"], economicHighlight: "Second largest banking center in the US after New York", techScene: "Growing fintech scene building on banking industry foundation" },
  { slug: "san-francisco", name: "San Francisco", state: "CA", stateFullName: "California", population: "870K", businessCount: "55,000+", topIndustries: ["Technology", "Finance", "Tourism"], economicHighlight: "Global tech capital with highest density of startups", techScene: "Epicenter of tech innovation, AI, and venture capital" },
  { slug: "indianapolis", name: "Indianapolis", state: "IN", stateFullName: "Indiana", population: "867K", businessCount: "30,000+", topIndustries: ["Manufacturing", "Healthcare", "Logistics"], economicHighlight: "Major logistics hub at the crossroads of America", techScene: "Growing tech sector with strong healthcare IT focus" },
  { slug: "seattle", name: "Seattle", state: "WA", stateFullName: "Washington", population: "750K", businessCount: "45,000+", topIndustries: ["Technology", "Aerospace", "Retail"], economicHighlight: "Home to Amazon, Microsoft, and Boeing headquarters", techScene: "Major tech hub with cloud computing and AI leadership" },
  { slug: "denver", name: "Denver", state: "CO", stateFullName: "Colorado", population: "715K", businessCount: "40,000+", topIndustries: ["Technology", "Energy", "Tourism"], economicHighlight: "Rocky Mountain hub with booming tech and outdoor industries", techScene: "Fast-growing tech scene with focus on aerospace and cannabis tech" },
  { slug: "washington-dc", name: "Washington", state: "DC", stateFullName: "District of Columbia", population: "690K", businessCount: "35,000+", topIndustries: ["Government", "Technology", "Nonprofits"], economicHighlight: "Federal government center with massive contracting economy", techScene: "Cybersecurity and govtech capital of America" },
  { slug: "boston", name: "Boston", state: "MA", stateFullName: "Massachusetts", population: "685K", businessCount: "40,000+", topIndustries: ["Education", "Biotech", "Finance"], economicHighlight: "World's leading biotech and life sciences cluster", techScene: "AI and robotics innovation center with strong university ties" },
  { slug: "el-paso", name: "El Paso", state: "TX", stateFullName: "Texas", population: "680K", businessCount: "20,000+", topIndustries: ["Trade", "Military", "Healthcare"], economicHighlight: "Major US-Mexico trade gateway with strong manufacturing", techScene: "Growing IT sector supporting trade and logistics" },
  { slug: "nashville", name: "Nashville", state: "TN", stateFullName: "Tennessee", population: "670K", businessCount: "35,000+", topIndustries: ["Healthcare", "Music", "Tourism"], economicHighlight: "Healthcare industry capital of America", techScene: "Health tech hub with growing startup ecosystem" },
  { slug: "detroit", name: "Detroit", state: "MI", stateFullName: "Michigan", population: "640K", businessCount: "25,000+", topIndustries: ["Automotive", "Tech", "Healthcare"], economicHighlight: "Automotive capital transforming into mobility innovation hub", techScene: "Autonomous vehicle and mobility tech leader" },
  { slug: "oklahoma-city", name: "Oklahoma City", state: "OK", stateFullName: "Oklahoma", population: "680K", businessCount: "25,000+", topIndustries: ["Energy", "Aerospace", "Biotech"], economicHighlight: "Energy industry hub diversifying into aerospace", techScene: "Growing tech sector with energy tech focus" },
  { slug: "portland", name: "Portland", state: "OR", stateFullName: "Oregon", population: "650K", businessCount: "35,000+", topIndustries: ["Technology", "Manufacturing", "Retail"], economicHighlight: "Sustainable business hub with strong creative economy", techScene: "Silicon Forest tech hub with hardware and software focus" },
  { slug: "las-vegas", name: "Las Vegas", state: "NV", stateFullName: "Nevada", population: "645K", businessCount: "40,000+", topIndustries: ["Entertainment", "Tourism", "Tech"], economicHighlight: "Entertainment capital diversifying into tech and sports", techScene: "Growing tech scene with focus on gaming and hospitality tech" },
  { slug: "memphis", name: "Memphis", state: "TN", stateFullName: "Tennessee", population: "630K", businessCount: "20,000+", topIndustries: ["Logistics", "Healthcare", "Manufacturing"], economicHighlight: "FedEx headquarters and major logistics hub", techScene: "Logistics tech and supply chain innovation center" },
  { slug: "louisville", name: "Louisville", state: "KY", stateFullName: "Kentucky", population: "620K", businessCount: "25,000+", topIndustries: ["Healthcare", "Logistics", "Manufacturing"], economicHighlight: "UPS hub and bourbon industry capital", techScene: "Healthcare IT and logistics tech growth center" },
  { slug: "baltimore", name: "Baltimore", state: "MD", stateFullName: "Maryland", population: "585K", businessCount: "20,000+", topIndustries: ["Healthcare", "Education", "Biotech"], economicHighlight: "Johns Hopkins drives major healthcare and research economy", techScene: "Cybersecurity and health tech innovation center" },
  { slug: "milwaukee", name: "Milwaukee", state: "WI", stateFullName: "Wisconsin", population: "575K", businessCount: "20,000+", topIndustries: ["Manufacturing", "Healthcare", "Finance"], economicHighlight: "Water technology hub with strong manufacturing base", techScene: "Growing tech scene with water tech specialization" },
  { slug: "albuquerque", name: "Albuquerque", state: "NM", stateFullName: "New Mexico", population: "560K", businessCount: "20,000+", topIndustries: ["Research", "Healthcare", "Film"], economicHighlight: "National labs drive significant research and development", techScene: "Defense tech and research innovation hub" },
  { slug: "tucson", name: "Tucson", state: "AZ", stateFullName: "Arizona", population: "545K", businessCount: "18,000+", topIndustries: ["Aerospace", "Education", "Healthcare"], economicHighlight: "Major aerospace and defense contractor hub", techScene: "Optics and space tech specialization" },
  { slug: "fresno", name: "Fresno", state: "CA", stateFullName: "California", population: "540K", businessCount: "15,000+", topIndustries: ["Agriculture", "Healthcare", "Logistics"], economicHighlight: "Agricultural capital of America's most productive farming region", techScene: "AgTech innovation center serving Central Valley" },
  { slug: "mesa", name: "Mesa", state: "AZ", stateFullName: "Arizona", population: "510K", businessCount: "15,000+", topIndustries: ["Healthcare", "Education", "Aerospace"], economicHighlight: "Fast-growing suburb with strong aerospace presence", techScene: "Tech corridor expansion from Phoenix metro" },
  { slug: "sacramento", name: "Sacramento", state: "CA", stateFullName: "California", population: "505K", businessCount: "25,000+", topIndustries: ["Government", "Healthcare", "Agriculture"], economicHighlight: "State capital with growing farm-to-fork economy", techScene: "Government tech and emerging startup scene" },
  { slug: "atlanta", name: "Atlanta", state: "GA", stateFullName: "Georgia", population: "500K", businessCount: "45,000+", topIndustries: ["Logistics", "Film", "Technology"], economicHighlight: "Major corporate hub and busiest airport in the world", techScene: "Fintech and film tech hub with strong startup culture" },
  { slug: "kansas-city", name: "Kansas City", state: "MO", stateFullName: "Missouri", population: "495K", businessCount: "25,000+", topIndustries: ["Logistics", "Healthcare", "Tech"], economicHighlight: "Central US logistics hub with growing tech scene", techScene: "Animal health and agtech innovation center" },
  { slug: "colorado-springs", name: "Colorado Springs", state: "CO", stateFullName: "Colorado", population: "480K", businessCount: "20,000+", topIndustries: ["Military", "Tourism", "Tech"], economicHighlight: "Major military installations drive economy", techScene: "Cybersecurity and defense tech hub" },
  { slug: "miami", name: "Miami", state: "FL", stateFullName: "Florida", population: "470K", businessCount: "40,000+", topIndustries: ["Finance", "Trade", "Tourism"], economicHighlight: "Gateway to Latin America with major financial sector", techScene: "Emerging tech hub attracting crypto and fintech companies" },
  { slug: "raleigh", name: "Raleigh", state: "NC", stateFullName: "North Carolina", population: "465K", businessCount: "25,000+", topIndustries: ["Technology", "Biotech", "Education"], economicHighlight: "Research Triangle drives innovation economy", techScene: "Major tech hub with strong biotech and pharma presence" },
  { slug: "omaha", name: "Omaha", state: "NE", stateFullName: "Nebraska", population: "485K", businessCount: "20,000+", topIndustries: ["Finance", "Insurance", "Agriculture"], economicHighlight: "Berkshire Hathaway headquarters and insurance hub", techScene: "Fintech and insurtech growing center" },
  { slug: "long-beach", name: "Long Beach", state: "CA", stateFullName: "California", population: "465K", businessCount: "15,000+", topIndustries: ["Trade", "Tourism", "Aerospace"], economicHighlight: "Major port city driving West Coast trade", techScene: "Logistics tech and aerospace innovation" },
  { slug: "virginia-beach", name: "Virginia Beach", state: "VA", stateFullName: "Virginia", population: "460K", businessCount: "18,000+", topIndustries: ["Military", "Tourism", "Tech"], economicHighlight: "Major Navy presence with resort economy", techScene: "Defense tech and cybersecurity growth" },
  { slug: "oakland", name: "Oakland", state: "CA", stateFullName: "California", population: "435K", businessCount: "20,000+", topIndustries: ["Port", "Tech", "Healthcare"], economicHighlight: "Major West Coast port with growing tech spillover", techScene: "East Bay tech hub with diverse startup scene" },
  { slug: "minneapolis", name: "Minneapolis", state: "MN", stateFullName: "Minnesota", population: "430K", businessCount: "25,000+", topIndustries: ["Healthcare", "Finance", "Retail"], economicHighlight: "Fortune 500 density among highest in nation", techScene: "Medical device and retail tech innovation" },
  { slug: "tulsa", name: "Tulsa", state: "OK", stateFullName: "Oklahoma", population: "400K", businessCount: "15,000+", topIndustries: ["Energy", "Aerospace", "Healthcare"], economicHighlight: "Energy industry center attracting remote workers", techScene: "Tulsa Remote program attracting tech talent" },
  { slug: "tampa", name: "Tampa", state: "FL", stateFullName: "Florida", population: "395K", businessCount: "25,000+", topIndustries: ["Finance", "Healthcare", "Tourism"], economicHighlight: "Major financial services center on Gulf Coast", techScene: "Growing tech scene with fintech focus" },
  { slug: "arlington", name: "Arlington", state: "TX", stateFullName: "Texas", population: "395K", businessCount: "15,000+", topIndustries: ["Entertainment", "Manufacturing", "Retail"], economicHighlight: "Sports and entertainment destination in DFW", techScene: "Growing tech presence in DFW corridor" },
  { slug: "new-orleans", name: "New Orleans", state: "LA", stateFullName: "Louisiana", population: "385K", businessCount: "18,000+", topIndustries: ["Tourism", "Energy", "Healthcare"], economicHighlight: "Unique cultural economy with growing tech sector", techScene: "Digital media and water management tech hub" },
  // 51-100
  { slug: "wichita", name: "Wichita", state: "KS", stateFullName: "Kansas", population: "395K", businessCount: "15,000+", topIndustries: ["Aviation", "Manufacturing", "Healthcare"] },
  { slug: "cleveland", name: "Cleveland", state: "OH", stateFullName: "Ohio", population: "370K", businessCount: "18,000+", topIndustries: ["Healthcare", "Manufacturing", "Finance"] },
  { slug: "bakersfield", name: "Bakersfield", state: "CA", stateFullName: "California", population: "385K", businessCount: "12,000+", topIndustries: ["Energy", "Agriculture", "Logistics"] },
  { slug: "aurora", name: "Aurora", state: "CO", stateFullName: "Colorado", population: "385K", businessCount: "12,000+", topIndustries: ["Healthcare", "Aerospace", "Retail"] },
  { slug: "anaheim", name: "Anaheim", state: "CA", stateFullName: "California", population: "350K", businessCount: "15,000+", topIndustries: ["Tourism", "Tech", "Manufacturing"] },
  { slug: "honolulu", name: "Honolulu", state: "HI", stateFullName: "Hawaii", population: "345K", businessCount: "20,000+", topIndustries: ["Tourism", "Military", "Healthcare"] },
  { slug: "santa-ana", name: "Santa Ana", state: "CA", stateFullName: "California", population: "310K", businessCount: "12,000+", topIndustries: ["Manufacturing", "Retail", "Services"] },
  { slug: "riverside", name: "Riverside", state: "CA", stateFullName: "California", population: "315K", businessCount: "12,000+", topIndustries: ["Logistics", "Healthcare", "Education"] },
  { slug: "corpus-christi", name: "Corpus Christi", state: "TX", stateFullName: "Texas", population: "320K", businessCount: "10,000+", topIndustries: ["Energy", "Tourism", "Military"] },
  { slug: "lexington", name: "Lexington", state: "KY", stateFullName: "Kentucky", population: "320K", businessCount: "12,000+", topIndustries: ["Education", "Healthcare", "Manufacturing"] },
  { slug: "stockton", name: "Stockton", state: "CA", stateFullName: "California", population: "315K", businessCount: "10,000+", topIndustries: ["Agriculture", "Logistics", "Healthcare"] },
  { slug: "henderson", name: "Henderson", state: "NV", stateFullName: "Nevada", population: "320K", businessCount: "12,000+", topIndustries: ["Healthcare", "Retail", "Tech"] },
  { slug: "saint-paul", name: "Saint Paul", state: "MN", stateFullName: "Minnesota", population: "310K", businessCount: "12,000+", topIndustries: ["Healthcare", "Education", "Manufacturing"] },
  { slug: "st-louis", name: "St. Louis", state: "MO", stateFullName: "Missouri", population: "300K", businessCount: "20,000+", topIndustries: ["Healthcare", "Finance", "Manufacturing"] },
  { slug: "cincinnati", name: "Cincinnati", state: "OH", stateFullName: "Ohio", population: "305K", businessCount: "18,000+", topIndustries: ["Healthcare", "Finance", "Manufacturing"] },
  { slug: "pittsburgh", name: "Pittsburgh", state: "PA", stateFullName: "Pennsylvania", population: "300K", businessCount: "20,000+", topIndustries: ["Healthcare", "Tech", "Education"] },
  { slug: "greensboro", name: "Greensboro", state: "NC", stateFullName: "North Carolina", population: "295K", businessCount: "12,000+", topIndustries: ["Manufacturing", "Healthcare", "Logistics"] },
  { slug: "anchorage", name: "Anchorage", state: "AK", stateFullName: "Alaska", population: "290K", businessCount: "10,000+", topIndustries: ["Oil & Gas", "Tourism", "Healthcare"] },
  { slug: "plano", name: "Plano", state: "TX", stateFullName: "Texas", population: "285K", businessCount: "15,000+", topIndustries: ["Technology", "Finance", "Healthcare"] },
  { slug: "lincoln", name: "Lincoln", state: "NE", stateFullName: "Nebraska", population: "290K", businessCount: "12,000+", topIndustries: ["Education", "Insurance", "Healthcare"] },
  { slug: "orlando", name: "Orlando", state: "FL", stateFullName: "Florida", population: "285K", businessCount: "25,000+", topIndustries: ["Tourism", "Tech", "Healthcare"] },
  { slug: "irvine", name: "Irvine", state: "CA", stateFullName: "California", population: "280K", businessCount: "18,000+", topIndustries: ["Technology", "Healthcare", "Finance"] },
  { slug: "newark", name: "Newark", state: "NJ", stateFullName: "New Jersey", population: "280K", businessCount: "10,000+", topIndustries: ["Logistics", "Healthcare", "Finance"] },
  { slug: "toledo", name: "Toledo", state: "OH", stateFullName: "Ohio", population: "270K", businessCount: "10,000+", topIndustries: ["Manufacturing", "Healthcare", "Logistics"] },
  { slug: "durham", name: "Durham", state: "NC", stateFullName: "North Carolina", population: "280K", businessCount: "12,000+", topIndustries: ["Technology", "Healthcare", "Education"] },
  { slug: "chula-vista", name: "Chula Vista", state: "CA", stateFullName: "California", population: "275K", businessCount: "8,000+", topIndustries: ["Retail", "Healthcare", "Services"] },
  { slug: "fort-wayne", name: "Fort Wayne", state: "IN", stateFullName: "Indiana", population: "265K", businessCount: "10,000+", topIndustries: ["Manufacturing", "Healthcare", "Education"] },
  { slug: "jersey-city", name: "Jersey City", state: "NJ", stateFullName: "New Jersey", population: "265K", businessCount: "12,000+", topIndustries: ["Finance", "Tech", "Real Estate"] },
  { slug: "st-petersburg", name: "St. Petersburg", state: "FL", stateFullName: "Florida", population: "265K", businessCount: "15,000+", topIndustries: ["Healthcare", "Tourism", "Tech"] },
  { slug: "laredo", name: "Laredo", state: "TX", stateFullName: "Texas", population: "260K", businessCount: "8,000+", topIndustries: ["Trade", "Logistics", "Healthcare"] },
  { slug: "madison", name: "Madison", state: "WI", stateFullName: "Wisconsin", population: "260K", businessCount: "15,000+", topIndustries: ["Education", "Healthcare", "Tech"] },
  { slug: "chandler", name: "Chandler", state: "AZ", stateFullName: "Arizona", population: "260K", businessCount: "10,000+", topIndustries: ["Technology", "Manufacturing", "Healthcare"] },
  { slug: "buffalo", name: "Buffalo", state: "NY", stateFullName: "New York", population: "255K", businessCount: "12,000+", topIndustries: ["Healthcare", "Education", "Manufacturing"] },
  { slug: "lubbock", name: "Lubbock", state: "TX", stateFullName: "Texas", population: "255K", businessCount: "10,000+", topIndustries: ["Education", "Healthcare", "Agriculture"] },
  { slug: "scottsdale", name: "Scottsdale", state: "AZ", stateFullName: "Arizona", population: "255K", businessCount: "18,000+", topIndustries: ["Tourism", "Healthcare", "Tech"] },
  { slug: "reno", name: "Reno", state: "NV", stateFullName: "Nevada", population: "250K", businessCount: "12,000+", topIndustries: ["Gaming", "Tech", "Logistics"] },
  { slug: "glendale", name: "Glendale", state: "AZ", stateFullName: "Arizona", population: "250K", businessCount: "8,000+", topIndustries: ["Retail", "Healthcare", "Entertainment"] },
  { slug: "gilbert", name: "Gilbert", state: "AZ", stateFullName: "Arizona", population: "245K", businessCount: "10,000+", topIndustries: ["Healthcare", "Education", "Tech"] },
  { slug: "winston-salem", name: "Winston-Salem", state: "NC", stateFullName: "North Carolina", population: "245K", businessCount: "10,000+", topIndustries: ["Healthcare", "Finance", "Manufacturing"] },
  { slug: "north-las-vegas", name: "North Las Vegas", state: "NV", stateFullName: "Nevada", population: "245K", businessCount: "6,000+", topIndustries: ["Logistics", "Manufacturing", "Retail"] },
  { slug: "norfolk", name: "Norfolk", state: "VA", stateFullName: "Virginia", population: "245K", businessCount: "10,000+", topIndustries: ["Military", "Maritime", "Healthcare"] },
  { slug: "chesapeake", name: "Chesapeake", state: "VA", stateFullName: "Virginia", population: "245K", businessCount: "8,000+", topIndustries: ["Manufacturing", "Retail", "Healthcare"] },
  { slug: "garland", name: "Garland", state: "TX", stateFullName: "Texas", population: "240K", businessCount: "8,000+", topIndustries: ["Manufacturing", "Retail", "Healthcare"] },
  { slug: "irving", name: "Irving", state: "TX", stateFullName: "Texas", population: "240K", businessCount: "15,000+", topIndustries: ["Technology", "Finance", "Healthcare"] },
  { slug: "hialeah", name: "Hialeah", state: "FL", stateFullName: "Florida", population: "235K", businessCount: "8,000+", topIndustries: ["Manufacturing", "Retail", "Healthcare"] },
  { slug: "fremont", name: "Fremont", state: "CA", stateFullName: "California", population: "230K", businessCount: "10,000+", topIndustries: ["Technology", "Manufacturing", "Healthcare"] },
  { slug: "boise", name: "Boise", state: "ID", stateFullName: "Idaho", population: "230K", businessCount: "15,000+", topIndustries: ["Technology", "Healthcare", "Agriculture"] },
  { slug: "richmond", name: "Richmond", state: "VA", stateFullName: "Virginia", population: "225K", businessCount: "12,000+", topIndustries: ["Finance", "Healthcare", "Government"] },
  { slug: "baton-rouge", name: "Baton Rouge", state: "LA", stateFullName: "Louisiana", population: "225K", businessCount: "12,000+", topIndustries: ["Energy", "Government", "Healthcare"] },
  { slug: "spokane", name: "Spokane", state: "WA", stateFullName: "Washington", population: "220K", businessCount: "10,000+", topIndustries: ["Healthcare", "Education", "Manufacturing"] },
  // 101-150
  { slug: "des-moines", name: "Des Moines", state: "IA", stateFullName: "Iowa", population: "215K", businessCount: "12,000+", topIndustries: ["Insurance", "Finance", "Healthcare"] },
  { slug: "tacoma", name: "Tacoma", state: "WA", stateFullName: "Washington", population: "215K", businessCount: "10,000+", topIndustries: ["Port", "Healthcare", "Military"] },
  { slug: "san-bernardino", name: "San Bernardino", state: "CA", stateFullName: "California", population: "215K", businessCount: "8,000+", topIndustries: ["Logistics", "Healthcare", "Education"] },
  { slug: "modesto", name: "Modesto", state: "CA", stateFullName: "California", population: "210K", businessCount: "8,000+", topIndustries: ["Agriculture", "Healthcare", "Manufacturing"] },
  { slug: "fontana", name: "Fontana", state: "CA", stateFullName: "California", population: "215K", businessCount: "6,000+", topIndustries: ["Logistics", "Manufacturing", "Retail"] },
  { slug: "santa-clarita", name: "Santa Clarita", state: "CA", stateFullName: "California", population: "210K", businessCount: "8,000+", topIndustries: ["Entertainment", "Aerospace", "Healthcare"] },
  { slug: "birmingham", name: "Birmingham", state: "AL", stateFullName: "Alabama", population: "200K", businessCount: "12,000+", topIndustries: ["Healthcare", "Finance", "Manufacturing"] },
  { slug: "oxnard", name: "Oxnard", state: "CA", stateFullName: "California", population: "200K", businessCount: "6,000+", topIndustries: ["Agriculture", "Manufacturing", "Healthcare"] },
  { slug: "fayetteville", name: "Fayetteville", state: "NC", stateFullName: "North Carolina", population: "205K", businessCount: "8,000+", topIndustries: ["Military", "Healthcare", "Retail"] },
  { slug: "moreno-valley", name: "Moreno Valley", state: "CA", stateFullName: "California", population: "210K", businessCount: "5,000+", topIndustries: ["Logistics", "Healthcare", "Retail"] },
  { slug: "rochester", name: "Rochester", state: "NY", stateFullName: "New York", population: "205K", businessCount: "10,000+", topIndustries: ["Healthcare", "Education", "Manufacturing"] },
  { slug: "glendale-ca", name: "Glendale", state: "CA", stateFullName: "California", population: "195K", businessCount: "10,000+", topIndustries: ["Entertainment", "Healthcare", "Finance"] },
  { slug: "huntington-beach", name: "Huntington Beach", state: "CA", stateFullName: "California", population: "200K", businessCount: "10,000+", topIndustries: ["Tourism", "Energy", "Healthcare"] },
  { slug: "salt-lake-city", name: "Salt Lake City", state: "UT", stateFullName: "Utah", population: "200K", businessCount: "18,000+", topIndustries: ["Technology", "Healthcare", "Finance"] },
  { slug: "grand-rapids", name: "Grand Rapids", state: "MI", stateFullName: "Michigan", population: "195K", businessCount: "12,000+", topIndustries: ["Manufacturing", "Healthcare", "Furniture"] },
  { slug: "amarillo", name: "Amarillo", state: "TX", stateFullName: "Texas", population: "200K", businessCount: "8,000+", topIndustries: ["Energy", "Agriculture", "Healthcare"] },
  { slug: "yonkers", name: "Yonkers", state: "NY", stateFullName: "New York", population: "200K", businessCount: "8,000+", topIndustries: ["Healthcare", "Retail", "Services"] },
  { slug: "aurora-il", name: "Aurora", state: "IL", stateFullName: "Illinois", population: "200K", businessCount: "6,000+", topIndustries: ["Manufacturing", "Healthcare", "Retail"] },
  { slug: "montgomery", name: "Montgomery", state: "AL", stateFullName: "Alabama", population: "200K", businessCount: "8,000+", topIndustries: ["Government", "Healthcare", "Manufacturing"] },
  { slug: "akron", name: "Akron", state: "OH", stateFullName: "Ohio", population: "190K", businessCount: "8,000+", topIndustries: ["Healthcare", "Manufacturing", "Polymers"] },
  { slug: "little-rock", name: "Little Rock", state: "AR", stateFullName: "Arkansas", population: "200K", businessCount: "10,000+", topIndustries: ["Healthcare", "Government", "Logistics"] },
  { slug: "huntsville", name: "Huntsville", state: "AL", stateFullName: "Alabama", population: "210K", businessCount: "12,000+", topIndustries: ["Aerospace", "Defense", "Technology"] },
  { slug: "augusta", name: "Augusta", state: "GA", stateFullName: "Georgia", population: "200K", businessCount: "8,000+", topIndustries: ["Healthcare", "Military", "Manufacturing"] },
  { slug: "port-st-lucie", name: "Port St. Lucie", state: "FL", stateFullName: "Florida", population: "200K", businessCount: "6,000+", topIndustries: ["Healthcare", "Retail", "Construction"] },
  { slug: "grand-prairie", name: "Grand Prairie", state: "TX", stateFullName: "Texas", population: "195K", businessCount: "6,000+", topIndustries: ["Manufacturing", "Logistics", "Entertainment"] },
  { slug: "columbus-ga", name: "Columbus", state: "GA", stateFullName: "Georgia", population: "195K", businessCount: "8,000+", topIndustries: ["Military", "Healthcare", "Manufacturing"] },
  { slug: "tallahassee", name: "Tallahassee", state: "FL", stateFullName: "Florida", population: "195K", businessCount: "10,000+", topIndustries: ["Government", "Education", "Healthcare"] },
  { slug: "overland-park", name: "Overland Park", state: "KS", stateFullName: "Kansas", population: "195K", businessCount: "12,000+", topIndustries: ["Technology", "Healthcare", "Finance"] },
  { slug: "tempe", name: "Tempe", state: "AZ", stateFullName: "Arizona", population: "190K", businessCount: "10,000+", topIndustries: ["Education", "Technology", "Healthcare"] },
  { slug: "mckinney", name: "McKinney", state: "TX", stateFullName: "Texas", population: "195K", businessCount: "8,000+", topIndustries: ["Technology", "Healthcare", "Retail"] },
  { slug: "mobile", name: "Mobile", state: "AL", stateFullName: "Alabama", population: "190K", businessCount: "8,000+", topIndustries: ["Aerospace", "Maritime", "Healthcare"] },
  { slug: "cape-coral", name: "Cape Coral", state: "FL", stateFullName: "Florida", population: "195K", businessCount: "6,000+", topIndustries: ["Construction", "Healthcare", "Retail"] },
  { slug: "shreveport", name: "Shreveport", state: "LA", stateFullName: "Louisiana", population: "190K", businessCount: "8,000+", topIndustries: ["Energy", "Gaming", "Healthcare"] },
  { slug: "frisco", name: "Frisco", state: "TX", stateFullName: "Texas", population: "200K", businessCount: "10,000+", topIndustries: ["Technology", "Sports", "Healthcare"] },
  { slug: "knoxville", name: "Knoxville", state: "TN", stateFullName: "Tennessee", population: "190K", businessCount: "10,000+", topIndustries: ["Education", "Healthcare", "Manufacturing"] },
  { slug: "worcester", name: "Worcester", state: "MA", stateFullName: "Massachusetts", population: "185K", businessCount: "8,000+", topIndustries: ["Healthcare", "Education", "Biotech"] },
  { slug: "brownsville", name: "Brownsville", state: "TX", stateFullName: "Texas", population: "185K", businessCount: "6,000+", topIndustries: ["Trade", "Healthcare", "Space"] },
  { slug: "vancouver", name: "Vancouver", state: "WA", stateFullName: "Washington", population: "185K", businessCount: "8,000+", topIndustries: ["Technology", "Healthcare", "Manufacturing"] },
  { slug: "sioux-falls", name: "Sioux Falls", state: "SD", stateFullName: "South Dakota", population: "190K", businessCount: "10,000+", topIndustries: ["Finance", "Healthcare", "Agriculture"] },
  { slug: "ontario-ca", name: "Ontario", state: "CA", stateFullName: "California", population: "180K", businessCount: "8,000+", topIndustries: ["Logistics", "Manufacturing", "Retail"] },
  { slug: "chattanooga", name: "Chattanooga", state: "TN", stateFullName: "Tennessee", population: "180K", businessCount: "10,000+", topIndustries: ["Manufacturing", "Technology", "Tourism"] },
  { slug: "providence", name: "Providence", state: "RI", stateFullName: "Rhode Island", population: "180K", businessCount: "10,000+", topIndustries: ["Healthcare", "Education", "Design"] },
  { slug: "newport-news", name: "Newport News", state: "VA", stateFullName: "Virginia", population: "180K", businessCount: "6,000+", topIndustries: ["Shipbuilding", "Military", "Healthcare"] },
  { slug: "rancho-cucamonga", name: "Rancho Cucamonga", state: "CA", stateFullName: "California", population: "175K", businessCount: "8,000+", topIndustries: ["Logistics", "Healthcare", "Retail"] },
  { slug: "santa-rosa", name: "Santa Rosa", state: "CA", stateFullName: "California", population: "175K", businessCount: "10,000+", topIndustries: ["Wine", "Healthcare", "Technology"] },
  { slug: "oceanside", name: "Oceanside", state: "CA", stateFullName: "California", population: "175K", businessCount: "8,000+", topIndustries: ["Military", "Tourism", "Healthcare"] },
  { slug: "salem", name: "Salem", state: "OR", stateFullName: "Oregon", population: "175K", businessCount: "8,000+", topIndustries: ["Government", "Healthcare", "Agriculture"] },
  { slug: "elk-grove", name: "Elk Grove", state: "CA", stateFullName: "California", population: "175K", businessCount: "5,000+", topIndustries: ["Retail", "Healthcare", "Services"] },
  { slug: "garden-grove", name: "Garden Grove", state: "CA", stateFullName: "California", population: "170K", businessCount: "6,000+", topIndustries: ["Retail", "Manufacturing", "Services"] },
  { slug: "pembroke-pines", name: "Pembroke Pines", state: "FL", stateFullName: "Florida", population: "170K", businessCount: "6,000+", topIndustries: ["Healthcare", "Retail", "Services"] },
  // 151-200
  { slug: "peoria", name: "Peoria", state: "AZ", stateFullName: "Arizona", population: "175K", businessCount: "6,000+", topIndustries: ["Healthcare", "Retail", "Services"] },
  { slug: "eugene", name: "Eugene", state: "OR", stateFullName: "Oregon", population: "170K", businessCount: "10,000+", topIndustries: ["Education", "Healthcare", "Technology"] },
  { slug: "corona", name: "Corona", state: "CA", stateFullName: "California", population: "160K", businessCount: "6,000+", topIndustries: ["Manufacturing", "Logistics", "Healthcare"] },
  { slug: "cary", name: "Cary", state: "NC", stateFullName: "North Carolina", population: "170K", businessCount: "10,000+", topIndustries: ["Technology", "Healthcare", "Finance"] },
  { slug: "springfield", name: "Springfield", state: "MO", stateFullName: "Missouri", population: "170K", businessCount: "10,000+", topIndustries: ["Healthcare", "Education", "Manufacturing"] },
  { slug: "fort-lauderdale", name: "Fort Lauderdale", state: "FL", stateFullName: "Florida", population: "180K", businessCount: "15,000+", topIndustries: ["Tourism", "Marine", "Finance"] },
  { slug: "alexandria", name: "Alexandria", state: "VA", stateFullName: "Virginia", population: "160K", businessCount: "10,000+", topIndustries: ["Government", "Technology", "Healthcare"] },
  { slug: "hayward", name: "Hayward", state: "CA", stateFullName: "California", population: "160K", businessCount: "6,000+", topIndustries: ["Manufacturing", "Healthcare", "Technology"] },
  { slug: "clarksville", name: "Clarksville", state: "TN", stateFullName: "Tennessee", population: "165K", businessCount: "6,000+", topIndustries: ["Military", "Healthcare", "Manufacturing"] },
  { slug: "lakewood", name: "Lakewood", state: "CO", stateFullName: "Colorado", population: "155K", businessCount: "8,000+", topIndustries: ["Government", "Healthcare", "Retail"] },
  { slug: "lancaster", name: "Lancaster", state: "CA", stateFullName: "California", population: "160K", businessCount: "5,000+", topIndustries: ["Aerospace", "Solar", "Healthcare"] },
  { slug: "salinas", name: "Salinas", state: "CA", stateFullName: "California", population: "160K", businessCount: "5,000+", topIndustries: ["Agriculture", "Healthcare", "Services"] },
  { slug: "palmdale", name: "Palmdale", state: "CA", stateFullName: "California", population: "160K", businessCount: "4,000+", topIndustries: ["Aerospace", "Manufacturing", "Healthcare"] },
  { slug: "hollywood", name: "Hollywood", state: "FL", stateFullName: "Florida", population: "155K", businessCount: "8,000+", topIndustries: ["Tourism", "Healthcare", "Entertainment"] },
  { slug: "springfield-ma", name: "Springfield", state: "MA", stateFullName: "Massachusetts", population: "155K", businessCount: "6,000+", topIndustries: ["Healthcare", "Education", "Manufacturing"] },
  { slug: "macon", name: "Macon", state: "GA", stateFullName: "Georgia", population: "155K", businessCount: "6,000+", topIndustries: ["Healthcare", "Logistics", "Manufacturing"] },
  { slug: "kansas-city-ks", name: "Kansas City", state: "KS", stateFullName: "Kansas", population: "155K", businessCount: "6,000+", topIndustries: ["Logistics", "Manufacturing", "Healthcare"] },
  { slug: "sunnyvale", name: "Sunnyvale", state: "CA", stateFullName: "California", population: "155K", businessCount: "10,000+", topIndustries: ["Technology", "Aerospace", "Healthcare"] },
  { slug: "pomona", name: "Pomona", state: "CA", stateFullName: "California", population: "150K", businessCount: "5,000+", topIndustries: ["Education", "Healthcare", "Manufacturing"] },
  { slug: "killeen", name: "Killeen", state: "TX", stateFullName: "Texas", population: "155K", businessCount: "4,000+", topIndustries: ["Military", "Healthcare", "Retail"] },
  { slug: "escondido", name: "Escondido", state: "CA", stateFullName: "California", population: "150K", businessCount: "6,000+", topIndustries: ["Healthcare", "Agriculture", "Retail"] },
  { slug: "pasadena", name: "Pasadena", state: "TX", stateFullName: "Texas", population: "150K", businessCount: "5,000+", topIndustries: ["Energy", "Healthcare", "Manufacturing"] },
  { slug: "naperville", name: "Naperville", state: "IL", stateFullName: "Illinois", population: "150K", businessCount: "8,000+", topIndustries: ["Technology", "Healthcare", "Finance"] },
  { slug: "bellevue", name: "Bellevue", state: "WA", stateFullName: "Washington", population: "150K", businessCount: "15,000+", topIndustries: ["Technology", "Healthcare", "Finance"] },
  { slug: "joliet", name: "Joliet", state: "IL", stateFullName: "Illinois", population: "150K", businessCount: "5,000+", topIndustries: ["Logistics", "Healthcare", "Manufacturing"] },
  { slug: "murfreesboro", name: "Murfreesboro", state: "TN", stateFullName: "Tennessee", population: "150K", businessCount: "6,000+", topIndustries: ["Education", "Healthcare", "Manufacturing"] },
  { slug: "midland", name: "Midland", state: "TX", stateFullName: "Texas", population: "145K", businessCount: "6,000+", topIndustries: ["Energy", "Healthcare", "Services"] },
  { slug: "rockford", name: "Rockford", state: "IL", stateFullName: "Illinois", population: "145K", businessCount: "6,000+", topIndustries: ["Manufacturing", "Healthcare", "Aerospace"] },
  { slug: "paterson", name: "Paterson", state: "NJ", stateFullName: "New Jersey", population: "145K", businessCount: "5,000+", topIndustries: ["Manufacturing", "Healthcare", "Retail"] },
  { slug: "savannah", name: "Savannah", state: "GA", stateFullName: "Georgia", population: "145K", businessCount: "10,000+", topIndustries: ["Tourism", "Port", "Manufacturing"] },
  { slug: "bridgeport", name: "Bridgeport", state: "CT", stateFullName: "Connecticut", population: "145K", businessCount: "6,000+", topIndustries: ["Finance", "Healthcare", "Manufacturing"] },
  { slug: "torrance", name: "Torrance", state: "CA", stateFullName: "California", population: "145K", businessCount: "8,000+", topIndustries: ["Aerospace", "Healthcare", "Retail"] },
  { slug: "mcallen", name: "McAllen", state: "TX", stateFullName: "Texas", population: "145K", businessCount: "6,000+", topIndustries: ["Trade", "Healthcare", "Retail"] },
  { slug: "syracuse", name: "Syracuse", state: "NY", stateFullName: "New York", population: "145K", businessCount: "8,000+", topIndustries: ["Education", "Healthcare", "Technology"] },
  { slug: "surprise", name: "Surprise", state: "AZ", stateFullName: "Arizona", population: "145K", businessCount: "4,000+", topIndustries: ["Healthcare", "Retail", "Services"] },
  { slug: "denton", name: "Denton", state: "TX", stateFullName: "Texas", population: "145K", businessCount: "6,000+", topIndustries: ["Education", "Healthcare", "Technology"] },
  { slug: "roseville", name: "Roseville", state: "CA", stateFullName: "California", population: "145K", businessCount: "8,000+", topIndustries: ["Healthcare", "Technology", "Retail"] },
  { slug: "thornton", name: "Thornton", state: "CO", stateFullName: "Colorado", population: "140K", businessCount: "4,000+", topIndustries: ["Retail", "Healthcare", "Services"] },
  { slug: "miramar", name: "Miramar", state: "FL", stateFullName: "Florida", population: "140K", businessCount: "5,000+", topIndustries: ["Healthcare", "Retail", "Services"] },
  { slug: "pasadena-ca", name: "Pasadena", state: "CA", stateFullName: "California", population: "140K", businessCount: "10,000+", topIndustries: ["Technology", "Education", "Healthcare"] },
  { slug: "mesquite", name: "Mesquite", state: "TX", stateFullName: "Texas", population: "140K", businessCount: "4,000+", topIndustries: ["Retail", "Healthcare", "Services"] },
  { slug: "olathe", name: "Olathe", state: "KS", stateFullName: "Kansas", population: "140K", businessCount: "6,000+", topIndustries: ["Technology", "Healthcare", "Logistics"] },
  { slug: "dayton", name: "Dayton", state: "OH", stateFullName: "Ohio", population: "140K", businessCount: "8,000+", topIndustries: ["Aerospace", "Healthcare", "Manufacturing"] },
  { slug: "carrollton", name: "Carrollton", state: "TX", stateFullName: "Texas", population: "135K", businessCount: "5,000+", topIndustries: ["Technology", "Healthcare", "Retail"] },
  { slug: "waco", name: "Waco", state: "TX", stateFullName: "Texas", population: "140K", businessCount: "6,000+", topIndustries: ["Education", "Healthcare", "Manufacturing"] },
  { slug: "orange", name: "Orange", state: "CA", stateFullName: "California", population: "140K", businessCount: "6,000+", topIndustries: ["Healthcare", "Education", "Retail"] },
  { slug: "fullerton", name: "Fullerton", state: "CA", stateFullName: "California", population: "140K", businessCount: "6,000+", topIndustries: ["Education", "Healthcare", "Manufacturing"] },
  { slug: "charleston", name: "Charleston", state: "SC", stateFullName: "South Carolina", population: "140K", businessCount: "12,000+", topIndustries: ["Tourism", "Port", "Technology"] },
  { slug: "west-valley-city", name: "West Valley City", state: "UT", stateFullName: "Utah", population: "140K", businessCount: "5,000+", topIndustries: ["Manufacturing", "Retail", "Healthcare"] },
  { slug: "visalia", name: "Visalia", state: "CA", stateFullName: "California", population: "135K", businessCount: "5,000+", topIndustries: ["Agriculture", "Healthcare", "Retail"] },
];

export type City = typeof cities[number];

// Helper function to get city-specific content
export function getCityContent(city: CityData) {
  const stateInfo = stateData[city.state] || { timezone: "Local", region: "United States", businessClimate: "Growing business environment" };
  const industries = stateIndustries[city.state] || ["Technology", "Healthcare", "Services"];

  return {
    ...city,
    ...stateInfo,
    industries,
    faqs: cityFaqTemplates.map(faq => ({
      question: faq.question
        .replace("{city}", city.name)
        .replace("{state}", city.state),
      answer: faq.answer
        .replace(/{city}/g, city.name)
        .replace(/{state}/g, city.state)
        .replace(/{stateFullName}/g, city.stateFullName)
        .replace(/{industry}/g, city.topIndustries?.[0] || industries[0])
    })),
    testimonials: testimonialTemplates.map(t => ({
      text: t.text
        .replace(/{city}/g, city.name)
        .replace(/{stateFullName}/g, city.stateFullName)
        .replace(/{industry}/g, city.topIndustries?.[0] || industries[0]),
      author: t.author,
      role: t.role
        .replace(/{city}/g, city.name)
        .replace(/{industry}/g, city.topIndustries?.[0] || industries[0])
    }))
  };
}

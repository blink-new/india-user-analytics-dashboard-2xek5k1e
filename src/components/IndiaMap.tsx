import React, { useState, useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Users, UserCheck, UserMinus, UserX } from 'lucide-react'
import { indiaStatesData, statusColors, getColorIntensity } from '@/data/indiaMapData'

interface User {
  id: string
  name: string
  email: string
  phone: string
  state: string
  district: string
  status: 'active' | 'dormant' | 'migrated'
  last_active_date: string
  registration_date: string
  migration_from_state?: string
  migration_from_district?: string
}

interface DrillDownLevel {
  type: 'country' | 'state' | 'district'
  name: string
  state?: string
}

interface IndiaMapProps {
  users: User[]
  onStateClick: (stateName: string) => void
  onDistrictClick: (districtName: string, stateName: string) => void
  currentLevel: DrillDownLevel
}

interface RegionStats {
  total: number
  active: number
  dormant: number
  migrated: number
  dominantStatus: 'active' | 'dormant' | 'migrated'
}

// State label positions for better map readability
const stateLabelPositions: Record<string, { x: number; y: number }> = {
  "Andhra Pradesh": { x: 450, y: 360 },
  "Arunachal Pradesh": { x: 620, y: 100 },
  "Assam": { x: 550, y: 140 },
  "Bihar": { x: 450, y: 155 },
  "Chhattisgarh": { x: 415, y: 245 },
  "Goa": { x: 270, y: 308 },
  "Gujarat": { x: 220, y: 215 },
  "Haryana": { x: 330, y: 105 },
  "Himachal Pradesh": { x: 320, y: 65 },
  "Jharkhand": { x: 475, y: 185 },
  "Karnataka": { x: 300, y: 365 },
  "Kerala": { x: 250, y: 425 },
  "Madhya Pradesh": { x: 315, y: 195 },
  "Maharashtra": { x: 315, y: 285 },
  "Manipur": { x: 582, y: 187 },
  "Meghalaya": { x: 555, y: 157 },
  "Mizoram": { x: 567, y: 207 },
  "Nagaland": { x: 595, y: 152 },
  "Odisha": { x: 475, y: 225 },
  "Punjab": { x: 290, y: 85 },
  "Rajasthan": { x: 235, y: 145 },
  "Sikkim": { x: 512, y: 117 },
  "Tamil Nadu": { x: 340, y: 445 },
  "Telangana": { x: 375, y: 285 },
  "Tripura": { x: 592, y: 187 },
  "Uttar Pradesh": { x: 375, y: 135 },
  "Uttarakhand": { x: 390, y: 85 },
  "West Bengal": { x: 515, y: 165 },
  "Andaman and Nicobar Islands": { x: 587, y: 407 },
  "Chandigarh": { x: 327, y: 87 },
  "Dadra and Nagar Haveli and Daman and Diu": { x: 232, y: 227 },
  "Delhi": { x: 352, y: 102 },
  "Jammu and Kashmir": { x: 295, y: 45 },
  "Ladakh": { x: 395, y: 37 },
  "Lakshadweep": { x: 187, y: 382 },
  "Puducherry": { x: 357, y: 422 }
}

const IndiaMap: React.FC<IndiaMapProps> = ({ users, onStateClick, onDistrictClick, currentLevel }) => {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<'active' | 'dormant' | 'migrated' | 'all'>('all')

  // Calculate statistics for each state/district
  const regionStats = useMemo(() => {
    const stats: Record<string, RegionStats> = {}

    if (currentLevel.type === 'country') {
      // Show state-level data
      const stateGroups = users.reduce((acc, user) => {
        if (!acc[user.state]) acc[user.state] = []
        acc[user.state].push(user)
        return acc
      }, {} as Record<string, User[]>)

      Object.entries(stateGroups).forEach(([state, stateUsers]) => {
        const active = stateUsers.filter(u => u.status === 'active').length
        const dormant = stateUsers.filter(u => u.status === 'dormant').length
        const migrated = stateUsers.filter(u => u.status === 'migrated').length
        const total = stateUsers.length

        let dominantStatus: 'active' | 'dormant' | 'migrated' = 'active'
        if (dormant > active && dormant > migrated) dominantStatus = 'dormant'
        else if (migrated > active && migrated > dormant) dominantStatus = 'migrated'

        stats[state] = { total, active, dormant, migrated, dominantStatus }
      })
    } else if (currentLevel.type === 'state' && currentLevel.state) {
      // Show district-level data for the selected state
      const stateUsers = users.filter(u => u.state === currentLevel.state)
      const districtGroups = stateUsers.reduce((acc, user) => {
        if (!acc[user.district]) acc[user.district] = []
        acc[user.district].push(user)
        return acc
      }, {} as Record<string, User[]>)

      Object.entries(districtGroups).forEach(([district, districtUsers]) => {
        const active = districtUsers.filter(u => u.status === 'active').length
        const dormant = districtUsers.filter(u => u.status === 'dormant').length
        const migrated = districtUsers.filter(u => u.status === 'migrated').length
        const total = districtUsers.length

        let dominantStatus: 'active' | 'dormant' | 'migrated' = 'active'
        if (dormant > active && dormant > migrated) dominantStatus = 'dormant'
        else if (migrated > active && migrated > dormant) dominantStatus = 'migrated'

        stats[district] = { total, active, dormant, migrated, dominantStatus }
      })
    }

    return stats
  }, [users, currentLevel])

  // Get the maximum count for color intensity calculation
  const maxCount = useMemo(() => {
    return Math.max(...Object.values(regionStats).map(s => {
      if (selectedStatus === 'all') return s.total
      return s[selectedStatus] || 0
    }), 1)
  }, [regionStats, selectedStatus])

  const getRegionColor = (regionName: string) => {
    const stats = regionStats[regionName]
    if (!stats || stats.total === 0) return '#f3f4f6' // gray-100

    let count: number
    let status: 'active' | 'dormant' | 'migrated'

    if (selectedStatus === 'all') {
      count = stats.total
      status = stats.dominantStatus
    } else {
      count = stats[selectedStatus]
      status = selectedStatus
    }

    if (count === 0) return '#f3f4f6'

    const intensity = getColorIntensity(count, maxCount)
    return statusColors[status][intensity]
  }

  const handleRegionClick = (regionName: string) => {
    if (currentLevel.type === 'country') {
      onStateClick(regionName)
    } else if (currentLevel.type === 'state' && currentLevel.state) {
      onDistrictClick(regionName, currentLevel.state)
    }
  }

  if (currentLevel.type === 'country') {
    // Render India map with states using SVG
    return (
      <div className="space-y-4">
        {/* Status Filter */}
        <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium text-gray-700 mr-2">Color by:</span>
          <Button
            variant={selectedStatus === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedStatus('all')}
          >
            All Users
          </Button>
          <Button
            variant={selectedStatus === 'active' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedStatus('active')}
            className={selectedStatus === 'active' ? 'bg-green-600 hover:bg-green-700 text-white' : ''}
          >
            Active
          </Button>
          <Button
            variant={selectedStatus === 'dormant' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedStatus('dormant')}
            className={selectedStatus === 'dormant' ? 'bg-yellow-600 hover:bg-yellow-700 text-white' : ''}
          >
            Dormant
          </Button>
          <Button
            variant={selectedStatus === 'migrated' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedStatus('migrated')}
            className={selectedStatus === 'migrated' ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}
          >
            Migrated
          </Button>
        </div>

        {/* SVG Map */}
        <div className="relative bg-white rounded-lg border p-4">
          <svg
            viewBox="0 0 700 500"
            className="w-full h-auto"
            style={{ minHeight: '500px', maxHeight: '600px' }}
          >
            {/* Map Background */}
            <rect width="700" height="500" fill="#f8fafc" />
            
            {/* States */}
            {Object.entries(indiaStatesData).map(([stateName, stateData]) => {
              const stats = regionStats[stateName]
              const hasData = stats && stats.total > 0
              const labelPos = stateLabelPositions[stateName] || { x: 350, y: 250 }
              
              return (
                <g key={stateName}>
                  {/* State Path */}
                  <path
                    d={stateData.path}
                    fill={getRegionColor(stateName)}
                    stroke="#374151"
                    strokeWidth="1.5"
                    className={`transition-all duration-300 ${
                      hasData 
                        ? 'cursor-pointer hover:stroke-2 hover:stroke-blue-600 hover:drop-shadow-lg' 
                        : 'cursor-not-allowed opacity-50'
                    }`}
                    onClick={() => hasData && handleRegionClick(stateName)}
                    onMouseEnter={() => {
                      if (hasData) {
                        setHoveredRegion(stateName)
                      }
                    }}
                    onMouseLeave={() => setHoveredRegion(null)}
                  />
                  
                  {/* State Label */}
                  <text
                    x={labelPos.x}
                    y={labelPos.y}
                    fontSize="9"
                    fill="#1f2937"
                    textAnchor="middle"
                    className="pointer-events-none font-medium select-none"
                    style={{ textShadow: '1px 1px 2px rgba(255,255,255,0.8)' }}
                  >
                    {stateName.length > 15 ? stateName.substring(0, 12) + '...' : stateName}
                  </text>
                  
                  {/* User Count */}
                  {stats && (
                    <text
                      x={labelPos.x}
                      y={labelPos.y + 12}
                      fontSize="7"
                      fill="#6b7280"
                      textAnchor="middle"
                      className="pointer-events-none select-none"
                      style={{ textShadow: '1px 1px 2px rgba(255,255,255,0.8)' }}
                    >
                      {selectedStatus === 'all' ? stats.total : stats[selectedStatus]} users
                    </text>
                  )}
                </g>
              )
            })}
          </svg>

          {/* Tooltip */}
          {hoveredRegion && regionStats[hoveredRegion] && (
            <div className="absolute top-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-10 min-w-48">
              <div className="text-sm font-semibold text-gray-900 mb-2">{hoveredRegion}</div>
              <div className="space-y-1 text-xs">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-3 w-3 text-gray-500" />
                    <span>Total:</span>
                  </div>
                  <span className="font-medium">{regionStats[hoveredRegion].total}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <UserCheck className="h-3 w-3 text-green-600" />
                    <span>Active:</span>
                  </div>
                  <span className="font-medium text-green-600">{regionStats[hoveredRegion].active}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <UserMinus className="h-3 w-3 text-yellow-600" />
                    <span>Dormant:</span>
                  </div>
                  <span className="font-medium text-yellow-600">{regionStats[hoveredRegion].dormant}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <UserX className="h-3 w-3 text-blue-600" />
                    <span>Migrated:</span>
                  </div>
                  <span className="font-medium text-blue-600">{regionStats[hoveredRegion].migrated}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-6 p-4 bg-gray-50 rounded-lg">
          <div className="text-sm font-medium text-gray-700">Legend:</div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: statusColors.active.light }}></div>
              <div className="w-4 h-4 rounded" style={{ backgroundColor: statusColors.active.medium }}></div>
              <div className="w-4 h-4 rounded" style={{ backgroundColor: statusColors.active.dark }}></div>
            </div>
            <span className="text-xs text-gray-600">Active (Low → High)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: statusColors.dormant.light }}></div>
              <div className="w-4 h-4 rounded" style={{ backgroundColor: statusColors.dormant.medium }}></div>
              <div className="w-4 h-4 rounded" style={{ backgroundColor: statusColors.dormant.dark }}></div>
            </div>
            <span className="text-xs text-gray-600">Dormant (Low → High)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: statusColors.migrated.light }}></div>
              <div className="w-4 h-4 rounded" style={{ backgroundColor: statusColors.migrated.medium }}></div>
              <div className="w-4 h-4 rounded" style={{ backgroundColor: statusColors.migrated.dark }}></div>
            </div>
            <span className="text-xs text-gray-600">Migrated (Low → High)</span>
          </div>
        </div>

        {Object.keys(regionStats).length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <div className="text-lg font-semibold mb-2">No Data Available</div>
            <div className="text-sm">No users found for the current filters</div>
          </div>
        )}
      </div>
    )
  } else if (currentLevel.type === 'state') {
    // Render districts for the selected state
    const stateData = indiaStatesData[currentLevel.name]
    const districts = stateData?.districts || []

    return (
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onStateClick('India')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to India
          </Button>
          <div>
            <h3 className="font-semibold text-blue-900">Districts in {currentLevel.name}</h3>
            <p className="text-sm text-blue-700">Click on any district to view detailed information</p>
          </div>
        </div>

        {/* Status Filter */}
        <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium text-gray-700 mr-2">Color by:</span>
          <Button
            variant={selectedStatus === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedStatus('all')}
          >
            All Users
          </Button>
          <Button
            variant={selectedStatus === 'active' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedStatus('active')}
            className={selectedStatus === 'active' ? 'bg-green-600 hover:bg-green-700 text-white' : ''}
          >
            Active
          </Button>
          <Button
            variant={selectedStatus === 'dormant' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedStatus('dormant')}
            className={selectedStatus === 'dormant' ? 'bg-yellow-600 hover:bg-yellow-700 text-white' : ''}
          >
            Dormant
          </Button>
          <Button
            variant={selectedStatus === 'migrated' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedStatus('migrated')}
            className={selectedStatus === 'migrated' ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}
          >
            Migrated
          </Button>
        </div>
        
        {/* Districts Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {districts.map((district) => {
            const stats = regionStats[district]
            const hasData = stats && stats.total > 0
            const count = selectedStatus === 'all' ? (stats?.total || 0) : (stats?.[selectedStatus] || 0)
            
            return (
              <div
                key={district}
                className={`relative transition-all duration-200 rounded-lg border-2 p-4 ${ 
                  hasData 
                    ? 'cursor-pointer hover:scale-105 hover:border-blue-400 border-gray-200 hover:shadow-lg' 
                    : 'cursor-not-allowed opacity-50 border-gray-100'
                }`}
                style={{
                  backgroundColor: getRegionColor(district)
                }}
                onClick={() => hasData && handleRegionClick(district)}
                onMouseEnter={() => hasData && setHoveredRegion(district)}
                onMouseLeave={() => setHoveredRegion(null)}
              >
                <div className="text-white font-semibold text-sm mb-2 drop-shadow-sm">
                  {district}
                </div>
                <div className="text-white text-xs drop-shadow-sm">
                  {count} {selectedStatus === 'all' ? 'users' : selectedStatus}
                </div>
                
                {hoveredRegion === district && stats && (
                  <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-10 min-w-max">
                    <div className="text-sm font-semibold text-gray-900 mb-2">{district}</div>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2">
                        <Users className="h-3 w-3 text-gray-500" />
                        <span>Total: {stats.total}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <UserCheck className="h-3 w-3 text-green-600" />
                        <span>Active: {stats.active}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <UserMinus className="h-3 w-3 text-yellow-600" />
                        <span>Dormant: {stats.dormant}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <UserX className="h-3 w-3 text-blue-600" />
                        <span>Migrated: {stats.migrated}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
        
        {Object.keys(regionStats).length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <div className="text-lg font-semibold mb-2">No Districts Found</div>
            <div className="text-sm">No users found in {currentLevel.name} for the current filters</div>
          </div>
        )}
      </div>
    )
  } else {
    // District level - show detailed user information
    return (
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
          <Button
            variant="outline"
            size="sm"
            onClick={() => currentLevel.state && onStateClick(currentLevel.state)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to {currentLevel.state}
          </Button>
          <div>
            <h3 className="font-semibold text-green-900">
              {currentLevel.name}, {currentLevel.state}
            </h3>
            <p className="text-sm text-green-700">Detailed view of users in this district</p>
          </div>
        </div>
        
        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <Card key={user.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="font-semibold text-sm">{user.name}</div>
                  <Badge 
                    variant={user.status === 'active' ? 'default' : user.status === 'dormant' ? 'secondary' : 'outline'}
                    className={
                      user.status === 'active' ? 'bg-green-100 text-green-800' :
                      user.status === 'dormant' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }
                  >
                    {user.status}
                  </Badge>
                </div>
                <div className="text-xs text-gray-600 space-y-1">
                  <div>{user.email}</div>
                  <div>Registered: {user.registration_date}</div>
                  {user.last_active_date && (
                    <div>Last Active: {user.last_active_date}</div>
                  )}
                  {user.migration_from_state && (
                    <div className="text-blue-600">
                      Migrated from: {user.migration_from_district}, {user.migration_from_state}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {users.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <div className="text-lg font-semibold mb-2">No Users Found</div>
            <div className="text-sm">No users found in this district for the current filters</div>
          </div>
        )}
      </div>
    )
  }
}

export default IndiaMap
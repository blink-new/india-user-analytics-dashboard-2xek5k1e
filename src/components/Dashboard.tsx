import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Users, UserCheck, UserX, UserMinus, Filter, Download, RefreshCw, Menu, MapPin } from 'lucide-react'
import { blink } from '@/blink/client'
import IndiaMap from './IndiaMap'

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

interface Analytics {
  total: number
  active: number
  dormant: number
  migrated: number
  activePercentage: number
  dormantPercentage: number
  migratedPercentage: number
}

interface DrillDownLevel {
  type: 'country' | 'state' | 'district'
  name: string
  state?: string
}

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [analytics, setAnalytics] = useState<Analytics>({
    total: 0,
    active: 0,
    dormant: 0,
    migrated: 0,
    activePercentage: 0,
    dormantPercentage: 0,
    migratedPercentage: 0
  })
  const [loading, setLoading] = useState(true)
  const [drillDown, setDrillDown] = useState<DrillDownLevel[]>([{ type: 'country', name: 'India' }])
  
  // Filters
  const [selectedState, setSelectedState] = useState<string | undefined>(undefined)
  const [selectedDistrict, setSelectedDistrict] = useState<string | undefined>(undefined)
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined)
  const [searchTerm, setSearchTerm] = useState('')

  // Get unique states and districts
  const states = [...new Set(users.map(user => user.state))].sort()
  const districts = selectedState 
    ? [...new Set(users.filter(user => user.state === selectedState).map(user => user.district))].sort()
    : []

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const result = await blink.db.users.list({
        orderBy: { registration_date: 'desc' }
      })
      setUsers(result)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateAnalytics = (userList: User[]) => {
    const total = userList.length
    const active = userList.filter(u => u.status === 'active').length
    const dormant = userList.filter(u => u.status === 'dormant').length
    const migrated = userList.filter(u => u.status === 'migrated').length
    
    return {
      total,
      active,
      dormant,
      migrated,
      activePercentage: total > 0 ? Math.round((active / total) * 100) : 0,
      dormantPercentage: total > 0 ? Math.round((dormant / total) * 100) : 0,
      migratedPercentage: total > 0 ? Math.round((migrated / total) * 100) : 0
    }
  }

  const applyFilters = () => {
    let filtered = users

    // Apply drill-down filters
    const currentLevel = drillDown[drillDown.length - 1]
    if (currentLevel.type === 'state' && currentLevel.state) {
      filtered = filtered.filter(user => user.state === currentLevel.state)
    } else if (currentLevel.type === 'district' && currentLevel.state) {
      filtered = filtered.filter(user => 
        user.state === currentLevel.state && user.district === currentLevel.name
      )
    }

    // Apply additional filters
    if (selectedState !== undefined) {
      filtered = filtered.filter(user => user.state === selectedState)
    }
    if (selectedDistrict !== undefined) {
      filtered = filtered.filter(user => user.district === selectedDistrict)
    }
    if (selectedStatus !== undefined) {
      filtered = filtered.filter(user => user.status === selectedStatus)
    }
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.district.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredUsers(filtered)
    setAnalytics(calculateAnalytics(filtered))
  }

  const handleStateClick = (stateName: string) => {
    const newLevel: DrillDownLevel = { type: 'state', name: stateName, state: stateName }
    setDrillDown([...drillDown, newLevel])
  }

  const handleDistrictClick = (districtName: string, stateName: string) => {
    const newLevel: DrillDownLevel = { type: 'district', name: districtName, state: stateName }
    setDrillDown([...drillDown, newLevel])
  }

  const handleBreadcrumbClick = (index: number) => {
    setDrillDown(drillDown.slice(0, index + 1))
  }

  const resetFilters = () => {
    setSelectedState(undefined)
    setSelectedDistrict(undefined)
    setSelectedStatus(undefined)
    setSearchTerm('')
    setDrillDown([{ type: 'country', name: 'India' }])
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active': return 'default'
      case 'dormant': return 'secondary'
      case 'migrated': return 'outline'
      default: return 'secondary'
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [users, selectedState, selectedDistrict, selectedStatus, searchTerm, drillDown])

  const FilterPanel = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5" />
        <h3 className="font-semibold">Filters</h3>
      </div>
      
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium mb-1 block">Search</label>
          <Input
            placeholder="Search users, states, districts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">State</label>
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger>
              <SelectValue placeholder="All States" />
            </SelectTrigger>
            <SelectContent>
              {states.map(state => (
                <SelectItem key={state} value={state}>{state}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">District</label>
          <Select value={selectedDistrict} onValueChange={setSelectedDistrict} disabled={!selectedState}>
            <SelectTrigger>
              <SelectValue placeholder="All Districts" />
            </SelectTrigger>
            <SelectContent>
              {districts.map(district => (
                <SelectItem key={district} value={district}>{district}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">User Status</label>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger>
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="dormant">Dormant</SelectItem>
              <SelectItem value="migrated">Migrated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={resetFilters} variant="outline" className="w-full">
          Reset Filters
        </Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-6 w-6 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">India User Analytics</h1>
            </div>
            
            {/* Breadcrumb */}
            <Breadcrumb>
              <BreadcrumbList>
                {drillDown.map((level, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && <BreadcrumbSeparator />}
                    <BreadcrumbItem>
                      {index === drillDown.length - 1 ? (
                        <BreadcrumbPage>{level.name}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink 
                          onClick={() => handleBreadcrumbClick(index)}
                          className="cursor-pointer hover:text-blue-600"
                        >
                          {level.name}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={fetchUsers} variant="outline" size="sm" disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            
            {/* Mobile Filter Toggle */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>
                    Filter and search user data
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6">
                  <FilterPanel />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block">
            <Card>
              <CardContent className="p-4">
                <FilterPanel />
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.total.toLocaleString()}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <UserCheck className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{analytics.active}</div>
                  <p className="text-xs text-muted-foreground">{analytics.activePercentage}% of total</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Dormant Users</CardTitle>
                  <UserMinus className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{analytics.dormant}</div>
                  <p className="text-xs text-muted-foreground">{analytics.dormantPercentage}% of total</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Migrated Users</CardTitle>
                  <UserX className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{analytics.migrated}</div>
                  <p className="text-xs text-muted-foreground">{analytics.migratedPercentage}% of total</p>
                </CardContent>
              </Card>
            </div>

            {/* Interactive Map */}
            <Card>
              <CardHeader>
                <CardTitle>Interactive India Map</CardTitle>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span>Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                    <span>Dormant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span>Migrated</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <IndiaMap 
                  users={filteredUsers}
                  onStateClick={handleStateClick}
                  onDistrictClick={handleDistrictClick}
                  currentLevel={drillDown[drillDown.length - 1]}
                />
              </CardContent>
            </Card>

            {/* Data Table */}
            <Card>
              <CardHeader>
                <CardTitle>User Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>State</TableHead>
                        <TableHead>District</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead>Registration</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loading ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8">
                            <div className="flex items-center justify-center">
                              <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                              Loading users...
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : filteredUsers.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                            No users found matching the current filters.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.state}</TableCell>
                            <TableCell>{user.district}</TableCell>
                            <TableCell>
                              <Badge variant={getStatusBadgeVariant(user.status)}>
                                {user.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{user.last_active_date || 'N/A'}</TableCell>
                            <TableCell>{user.registration_date}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
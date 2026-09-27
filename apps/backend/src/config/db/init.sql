# Database initialization script for AgentClinic
# Run on first PostgreSQL container startup

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create application schema
CREATE SCHEMA IF NOT EXISTS agent_clinic;

-- Agent profiles table
CREATE TABLE IF NOT EXISTS agent_clinic.agent_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    capabilities JSONB,
    stress_indicators JSONB,
    preferences JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Check-in requests table
CREATE TABLE IF NOT EXISTS agent_clinic.check_in_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agent_id UUID REFERENCES agent_clinic.agent_profiles(id),
    status VARCHAR(50) DEFAULT 'pending',
    priority VARCHAR(20) DEFAULT 'medium',
    request_type VARCHAR(100),
    message TEXT,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_agent_profiles_name ON agent_clinic.agent_profiles USING GIN (to_tsvector('english', name));
CREATE INDEX IF NOT EXISTS idx_check_in_requests_agent_id ON agent_clinic.check_in_requests(agent_id);
CREATE INDEX IF NOT EXISTS idx_check_in_requests_status ON agent_clinic.check_in_requests(status);
CREATE INDEX IF NOT EXISTS idx_check_in_requests_created_at ON agent_clinic.check_in_requests(created_at);

-- Enable Row Level Security
ALTER TABLE agent_clinic.agent_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_clinic.check_in_requests ENABLE ROW LEVEL SECURITY;

-- RLS policies (allow all for now, refine as needed)
CREATE POLICY "Allow all" ON agent_clinic.agent_profiles USING (true);
CREATE POLICY "Allow all" ON agent_clinic.check_in_requests USING (true);

import { vi } from 'vitest'

// Mock NestJS decorators properly
const Controller = vi.fn((path?: string) => (target: any) => {})
const Get = vi.fn(() => (target: any, key: string, descriptor: PropertyDescriptor) => {})
const Post = vi.fn(() => (target: any, key: string, descriptor: PropertyDescriptor) => {})
const Param = vi.fn(() => (target: any, key: string, index: number) => {})
const Body = vi.fn(() => (target: any, key: string, descriptor: PropertyDescriptor) => {})
const Query = vi.fn(() => (target: any, key: string, descriptor: PropertyDescriptor) => {})
const UseGuards = vi.fn(() => (target: any) => {})
const Request = vi.fn(() => (target: any, key: string, descriptor: PropertyDescriptor) => {})
const Roles = vi.fn(() => (target: any, key: string, descriptor: PropertyDescriptor) => {})

vi.mock('@nestjs/common', async () => {
  const actual = await vi.importActual('@nestjs/common')
  return {
    ...actual,
    Controller,
    Get,
    Post,
    Param,
    Body,
    Query,
    UseGuards,
    Request,
    Roles,
    HttpStatus: actual.HttpStatus,
    HttpException: actual.HttpException,
  }
})

vi.mock('@nestjs/testing', async () => {
  const actual = await vi.importActual('@nestjs/testing')
  return {
    ...actual,
    Test: actual.Test,
  }
})

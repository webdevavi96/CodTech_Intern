# Chat App

A lightweight, browser-based chat application designed for frictionless communication. Users can register and start messaging instantly—no contact saving, no installations, and no unnecessary discovery steps.

## Overview

This application focuses on reducing onboarding friction while maintaining a clean real-time communication experience. It leverages modern web technologies to provide seamless authentication, live messaging, and state management without persistent client-side storage.

## Core Features

- Real-time messaging
- Bi-directional communication powered by ```Socket.io``` for low-latency message delivery.
- Token-based authentication
- Secure session handling using access and refresh tokens.
- Email OTP verification
- Ensures authenticity of users during registration.
- Controlled user base
- Prevents fake or spam accounts through verification mechanisms.
- Profile customization
- Users can manage and personalize their profiles.

## Engineering Challenges & Solutions

### 1. Global User State Management

Managing authentication state across the application without relying on insecure client-side storage was a key challenge.

- Avoided ```localStorage``` due to its exposure via browser dev tools.
- Implemented React Context API with ```useContext``` for global state management.

- #### Maintained user session in memory, ensuring -

  - Automatic cleanup on tab close
  - Reduced attack surface (no persistent storage)

#### Session Recovery Strategy

- On reload, the app attempts to rehydrate the session using a refresh token.
- If the refresh token is invalid or expired, the user is redirected to the login screen.

This approach balances usability and security without introducing unnecessary complexity.

### 2. Socket Lifecycle & Auto-Scroll Handling

Handling real-time updates introduced two main concerns:

#### a. Auto-scrolling behavior

- Ensured that incoming messages automatically scroll the chat view to the latest message.
- Maintained consistent UX even during rapid message inflow.

#### b. Socket connection management

- Switching between conversations requires re-establishing socket connections.

- Traditional state ```(useState)``` was unreliable for maintaining persistent socket references across renders.

#### Solution

-Used ```useRef``` to store and manage the socket instance.

*Benefits:*

- Persistent reference across renders
- No unnecessary re-renders
- Reliable connection tracking

This approach ensures stable socket handling and predictable behavior during user transitions.

### Current Limitations

#### 1. Limited Security

- Messages are not end-to-end encrypted.
- Communication is functional but not yet hardened for high-security use cases.

#### 2. No Media Sharing

- The application currently supports only text-based communication.
- File and media transfer capabilities are not implemented.

#### 3. No Calling Features

- Voice and video communication are not supported at this stage.

### Future Scope

- End-to-end encryption for chats
- Media and file sharing support
- Voice and video calling
- Improved session hardening and security layers

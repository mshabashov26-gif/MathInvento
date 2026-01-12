# Database Documentation

## Overview
The IB Math Mastery Engine uses **localStorage** as its database system. This is a browser-based storage solution that persists data locally on the user's device.

## Storage Location
- **Storage Type**: Browser localStorage
- **Location**: Stored in the user's browser (client-side only)
- **Persistence**: Data persists until cleared by user or browser settings
- **Scope**: Each user's data is stored separately per browser/device

## Data Storage Structure

### 1. User Profiles (`ibMathProfile`)
**Key**: `ibMathProfile`
**Structure**:
```javascript
{
    name: string,
    course: string,
    level: string,
    joinedDate: ISO string,
    totalQuestions: number,
    totalMarks: number,
    averageScore: number
}
```

### 2. User Accounts (`ibMathUsers`)
**Key**: `ibMathUsers`
**Structure**: Object where keys are user IDs and values are user objects:
```javascript
{
    userId: {
        id: string,
        username: string,
        email: string,
        password: string (plain text - for demo only),
        course: string,
        joinedDate: ISO string,
        lastLogin: ISO string,
        stats: {
            totalQuestions: number,
            totalMarks: number,
            earnedMarks: number,
            averageScore: number,
            currentStreak: number,
            longestStreak: number,
            lastActivityDate: ISO string,
            totalDaysActive: number
        },
        achievements: array,
        groups: array,
        level: number,
        levelName: string,
        experience: number
    }
}
```

### 3. Statistics (`ibMathStatistics`)
**Key**: `ibMathStatistics`
**Structure**:
```javascript
{
    topics: {
        'Topic Name': {
            attempts: number,
            correct: number,
            totalMarks: number,
            earnedMarks: number,
            averageScore: number
        }
    },
    difficulties: {...},
    papers: {...},
    recentActivity: array,
    mockExams: array
}
```

### 4. Groups (`ibMathGroups`)
**Key**: `ibMathGroups`
**Structure**: Object where keys are group IDs and values are group objects:
```javascript
{
    groupId: {
        id: string,
        name: string,
        description: string,
        creatorId: string,
        isPublic: boolean,
        createdAt: ISO string,
        members: array,
        admins: array,
        leaderboard: object,
        stats: object,
        competitions: array
    }
}
```

### 5. Current User (`currentUserId`)
**Key**: `currentUserId`
**Value**: User ID string of currently logged-in user

### 6. Chat History (`ibMathChatHistory`)
**Key**: `ibMathChatHistory`
**Structure**: Array of chat messages:
```javascript
[
    {
        role: 'user' | 'assistant',
        content: string,
        timestamp: ISO string
    }
]
```

## Questions Database
**File**: `questions-db.js`
- **Type**: JavaScript object/array (static data)
- **Not stored in localStorage** - loaded from file
- Contains real IB questions organized by topic, difficulty, and paper type

## Advantages of localStorage
1. ✅ **No Backend Required**: Works completely client-side
2. ✅ **Fast**: Instant data access
3. ✅ **Simple**: Easy to implement and debug
4. ✅ **Privacy**: Data stays on user's device
5. ✅ **No Setup**: Works immediately without server configuration

## Limitations
1. ❌ **Browser-Specific**: Data not synced across devices/browsers
2. ❌ **Storage Limit**: ~5-10MB per domain
3. ❌ **Not Secure**: Passwords stored in plain text (for demo only)
4. ❌ **No Sharing**: Users can't share data with others
5. ❌ **Can Be Cleared**: Users can clear browser data

## Migration Path (Future)
For production, consider migrating to:
- **Backend Database**: PostgreSQL, MongoDB, or Firebase
- **User Authentication**: OAuth, JWT tokens
- **Data Sync**: Real-time synchronization across devices
- **Secure Storage**: Encrypted passwords and sensitive data

## Viewing Stored Data
To view localStorage data:
1. Open browser Developer Tools (F12)
2. Go to "Application" tab (Chrome) or "Storage" tab (Firefox)
3. Expand "Local Storage"
4. Select your domain
5. View all stored keys and values

## Data Backup
Users can export their data:
```javascript
// Export function (can be added)
localStorage.getItem('ibMathUsers')
localStorage.getItem('ibMathStatistics')
```

## Questions About Database?
- **Where is it?**: Browser localStorage (client-side)
- **What format?**: JSON strings (automatically parsed)
- **How to access?**: Via JavaScript `localStorage.getItem()` and `localStorage.setItem()`
- **Is it persistent?**: Yes, until browser data is cleared
- **Is it secure?**: No, this is a demo system - production needs a backend


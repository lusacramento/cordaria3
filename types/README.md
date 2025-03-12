# Types Documentation

This folder contains TypeScript type definitions used in the application. Below is a brief description of each type file:

## Contents

### SweetAlertData.ts
Contains type definitions for SweetAlert data.

- **Description**: Defines the structure of data used in SweetAlert notifications.
- **Fields**:
  - `title`: String
  - `message`: string
  - `icon`: SweetAlertIcon

### Instrument.ts
Contains type definitions for musical instruments.

- **Description**: Defines the structure of data related to musical instruments.
- **Fields**:
  - `ACOUSTICGUITAR`: 'Acoustic Guitar'
  - `ELECTRICGUITAR`: 'Electric Guitar'
  - `BASS`: 'Bass'
  - `CAVACO`: 'Cavaco'
  - `NOT_SELECTED`: 'Não Selecionado'

### LessonMessage.ts
Contains type definitions for lesson messages.

- **Description**: Defines the structure of messages displayed during lessons.
- **Fields**:
  - `title`: 'string'
  - `description`: 'string'
  - `icon`: SweetAlertIcon
  - `isAwarded`: boolean
  - `awardNumber`: number

### User.ts
Contains type definitions for user data.

- **Description**: Defines the structure of user-related data, including authentication and profile information.
- **Fields**:
  - `_id?`: string
  - `email`: string
  - `userName`: string
  - `password`: string
  - `confirmPassword?`: string
  - `acceptTerms?`: boolean
  - `rescuePassword?`: { token?: string, expiresAt?: Date }

### Progress.ts
Contains type definitions for user progress.

- **Description**: Defines the structure of data related to user progress in lessons and practice sessions.
- **Fields**:
  - `_id?`: ObjectId
  - `userId`: ObjectId
  - `lesson`: ObjectId
  - `isCompleted`: boolean
  - `instrument`: Instrument
  - `currentLesson`: number

### Ranking.ts
Contains type definitions for user rankings.

- **Description**: Defines the structure of data related to user rankings and leaderboards.

### Score.ts
Contains type definitions for user scores.

- **Description**: Defines the structure of data related to user scores in lessons and practice sessions.

### Settings.ts
Contains type definitions for user settings.

- **Description**: Defines the structure of data related to user settings and preferences.
- **Fields**:
  - `_id?`: ObjectId
  - `userId`: ObjectId
  - `instrument`: Instrument
  - `viewMode`: ViewMode
  - `counter`: number

### Statistic.ts
Contains type definitions for user statistics.

- **Description**: Defines the structure of data related to user statistics and performance metrics.
- **Fields**:
  - `number`: number
  - `level`: string
  - `bpm`: number
  - `isCompleted`: boolean

### Lesson.ts
Contains type definitions for lessons.

- **Description**: Defines the structure of data related to lessons, including lesson content and metadata.
- **Fields**:
  - `_id?`: string
  - `number`: number
  - `quantityOfStrings`: number
  - `level`: string
  - `firstFinger`: number
  - `stringNumber`: string
  - `bpm`: number
  - `message`: LessonMessage
  - `points`: number

### Box.ts
Contains type definitions for boxes.

- **Description**: Defines the structure of data related to boxes used in the application.
- **Fields**:
  - `content`: string
  - `schema`: string
  - `leftLogo?`: boolean
  - `rightLogo?`: boolean

### RescuePassword.ts
Contains type definitions for rescue password.

- **Description**: Defines the structure of data related to password recovery.
- **Fields**:
  - `token`: string
  - `expiresAt`: Date

### UserDetails.ts
Contains type definitions for user details.

- **Description**: Defines the structure of detailed user information.
- **Fields**:
  - `_id`: ObjectId
  - `userId`: ObjectId
  - `fullName`: string
  - `age`: number
  - `state`: string
  - `country`: string
  - `avatar`: string
  - `location`: Location

### Location.ts
Contains type definitions for locations.

- **Description**: Defines the structure of data related to locations.
- **Fields**:
  - `id`: string
  - `city`: string
  - `state`: string
  - `country`: string

### ViewMode.ts
Contains type definitions for view modes.

- **Description**: Defines the structure of data related to different view modes in the application.
- **Fields**:
  - `CARDS3`: '3 cards'
  - `CARDS2`: '2 cards'
  - `CARDSALL`: 'All Cards'
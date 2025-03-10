# Development Log

## 2025-02-24 19:37:50 GMT - Added Agent and Deep Research Fields

### Changes Made:
1. New Fields Addition:
   - Added 'agentName' field to all models
   - Added 'deepName' field to all models
   - Set specific values:
     • OpenAI ChatGPT: agentName = "Operator"
     • Perplexity: agentName = "Comet", deepName = "DeepResearch"
     • All other models: both fields set to false
   - Updated attributes list to include new fields
   - Maintained consistent data structure

## 2025-02-11 00:18:29 GMT - Added Mistral (LeChat)

### Changes Made:
1. New Model Addition:
   - Added Mistral (LeChat) to the comparison
   - Included comprehensive capabilities:
     • Advanced multilingual support
     • Document analysis features
     • Code interpretation
     • Image generation via Flux Ultra
   - Updated model data structure with all attributes
   - Maintained consistent formatting

## 2025-01-29 09:15:53 GMT - export update
prompt: consolidate all files in this project folder into one called "export.md", separate each file by format heading one level with the title of the file. this is so that i can upload it somewhere else

placing into deepseek in lex.pro


### Changes Made:
1. Font Integration:
   - Added Google Fonts (Archivo Narrow)
   - Implemented as primary font throughout interface
   - Set appropriate font weights for different elements:
     • Regular (400) for body text
     • Medium (500) for toggles and buttons
     • Semi-bold (600) for headings and table headers
   - Added fallback system fonts for better loading

2. CSS Improvements:
   - Added font variable to root for consistency
   - Optimized font loading with preconnect
   - Maintained responsive design with new typography
   - Enhanced readability across all screen sizes

## 2025-01-29 08:55:08 GMT - Added Favicon

### Changes Made:
1. UI Enhancement:
   - Added Card Index Divider emoji (🗂️) as favicon
   - Used inline SVG data URL for compatibility
   - Maintains clean look in browser tabs
   - No additional file dependencies

## 2025-01-29 08:43:17 GMT - Server Deployment and Data Updates

### Changes Made:
1. Server Deployment:
   - Successfully launched local Python HTTP server
   - Confirmed server running on port 8000
   - Verified all routes and file serving

2. Data Refinements:
   - Added Flux to image generation tools list
   - Updated personal links in Other Notes section
   - Added Build Your Own Apps reference
   - Maintained all previous functionality

## 2025-01-29 06:54:28 GMT - Feature Additions and Data Updates

### Changes Made:
1. New Attribute:
   - Added 'sharesThreads' boolean field to all models
   - Set to true for OpenAI models, Grok, and Perplexity
   - Set to false for all other services

2. New Information Section:
   - Added "Audio Generation" toggle with tools:
     • ElevenLabs
     • Google's NotebookLM Audio Overview

3. Data Structure:
   - Updated attributes list to include sharesThreads
   - Maintained consistent ordering of attributes
   - Updated timestamp display

## 2025-01-29 06:45:56 GMT - UI Polish and Timestamp Addition

### Changes Made:
1. Toggle Arrow Improvements:
   - Fixed arrow rotation behavior
   - Now points right (0deg) when collapsed
   - Points down (90deg) when expanded
   - Smoother transition animation

2. Added Timestamp Feature:
   - Added GMT timestamp to bottom-right corner
   - Semi-transparent background for better visibility
   - Updates with each deployment
   - Styled to match overall design theme

## 2025-01-28 20:44:23 HST - UI Enhancements and Bug Fixes

### Changes Made:
1. Instructions Panel Improvements:
   - Added "Other Notes" toggle section with helpful tips
   - Fixed toggle functionality for all instruction sections
   - Improved arrow rotation animation (points down when expanded)
   - Made all toggles start in collapsed state

2. New Information Sections:
   - Added "Image Generation" toggle with list of tools:
     • Adobe Firefly (vector within Illustrator)
     • Canva Magic
     • MidJourney
     • Ideogram
   - Added "Video Generation" toggle with list of tools:
     • RunwayML

3. Technical Fixes:
   - Updated JavaScript to handle multiple toggles properly
   - Fixed CSS transitions for smooth animations
   - Improved toggle state management
   - Enhanced visual feedback for expanded/collapsed states

## 2025-01-28 20:38:51 HST - UI and Functionality Improvements

### Changes Made:
1. Attribute Sorting Enhancement:
   - Changed from filtering to sorting behavior
   - Implemented three-state sorting for boolean values:
     • True values first
     • False values first
     • Text descriptions between true/false values
   - Improved visual feedback for sort state

2. Layout Improvements:
   - Fixed sticky first column behavior
   - Added persistent colored border (primary color)
   - Used pseudo-elements for reliable border display during scroll
   - Improved overall table structure

3. Instructions and Attribution:
   - Added collapsible instructions panel
   - Added attribution to Ethan Mollick's comparison guide
   - Improved instructions clarity with bullet points
   - Made instructions toggle smooth with CSS transitions

4. Data Structure Updates:
   - Added generatesVideo field to all models
   - Reordered attributes for better logical grouping
   - Fixed data consistency across models

These changes improve both the functionality and visual polish of the comparison tool while maintaining its clean, efficient interface.

## 2025-01-27 15:29:57 HST - Phase 1 Planning

### Initial Structure and Approach
We'll start with the simplest possible implementation that demonstrates the core functionality:

1. Basic Structure:
   - Single HTML file (index.html)
   - Single JavaScript file (app.js)
   - Inline CSS for simplicity in phase 1
   - Hard-coded data array for initial testing

2. Why This Approach:
   - Minimizes initial complexity
   - Allows quick testing and validation
   - No build tools required for phase 1
   - Can be easily deployed to GitHub Pages
   - Provides a solid foundation for adding features

### Next Steps:
1. Create basic file structure:
   ```
   /
   ├── index.html
   ├── app.js
   └── README.md
   ```

2. Implement core features in order:
   - Basic table display
   - Search functionality
   - View toggle (normal/transposed)

3. Testing:
   - Local testing via simple HTTP server
   - Test across different browsers
   - Validate mobile responsiveness

4. Initial GitHub Pages deployment:
   - Create repository
   - Push initial working version
   - Set up GitHub Pages

This approach allows us to:
- Get immediate feedback on core functionality
- Validate the basic user experience
- Identify any fundamental issues early
- Have a working demo to share quickly

Questions to resolve before proceeding:
1. Should we include any CSS framework for faster styling?
2. Do we want to implement the search using Fuse.js immediately or start with basic filtering?
3. Should we set up any basic testing framework from the start?

## 2025-01-27 15:32:27 HST - Phase 1 Implementation Decisions

### Decisions Made:
1. Testing Approach: Python's built-in HTTP server (simplest option)
   - No additional dependencies needed
   - Works on any machine with Python installed
   - Single command to start

2. Styling: Custom CSS Framework
   - Keep full control over styling
   - No external dependencies
   - Start minimal, expand as needed
   - Focus on readability and responsiveness

3. Search Implementation: Fuse.js
   - Better search experience from the start
   - Simple to implement
   - Flexible for future enhancements

### Immediate Next Steps:
1. Create the basic file structure:
   ```
   comparison/
   ├── index.html      # Main HTML file with inline CSS
   ├── app.js          # JavaScript with Fuse.js integration
   └── README.md       # Basic setup instructions
   ```

2. Test locally using Python's HTTP server:
   ```bash
   python3 -m http.server 8000
   ```
   Then open: http://localhost:8000

This gives us the fastest path to a working prototype while maintaining good practices.

## 2025-01-27 15:38:58 HST - UI Enhancements

### New Features to Implement:
1. Rename "Toggle View" to "Transpose Service and Attribute" for clarity
2. Add UI controls for showing/hiding services and attributes
3. Add sorting functionality when clicking attribute names (prioritizing checkmarks)

### Implementation Plan:
1. Update button text and styling
2. Add new controls section with:
   - Service visibility toggles
   - Attribute visibility toggles
3. Enhance table headers with:
   - Click-to-sort functionality
   - Visual indicators for sort state
   - Priority sorting for boolean values

These changes will improve the tool's usability while maintaining its clean interface.

## 2025-01-27 15:42:25 HST - UI Refinements

### UI Updates:
1. Terminology Changes:
   - Changed "Transpose" to "Flip" for better clarity
   - Updated button text to be more user-friendly

2. Color Enhancements:
   - Added soft purple theme for service toggles
   - Added soft green theme for attribute toggles
   - Maintained consistent hover states

3. New Controls:
   - Added "Show All / Hide All" for services
   - Added "Show All / Hide All" for attributes
   - Improved toggle button layout

These changes make the interface more intuitive and visually organized while maintaining the clean design.

## 2025-01-27 15:46:52 HST - Core Feature Updates

### New Requirements:
1. Service Column Always Visible:
   - Remove service from toggleable attributes
   - Ensure it's always the first column
   - Keep it visible in both normal and transposed views

2. Drag and Drop Functionality:
   - Add ability to reorder columns via drag and drop
   - Add ability to reorder rows in normal view
   - Maintain order state between view changes
   - Use HTML5 Drag and Drop API for native performance

### Implementation Approach:
1. Service Column:
   - Remove from attribute toggles
   - Create fixed first column styling
   - Update rendering logic to always include service

2. Drag and Drop:
   - Add drag handles to headers and rows
   - Implement drag events and visual feedback
   - Store and maintain custom order
   - Sync order between normal and transposed views

## 2025-01-27 15:50:42 HST - Bug Fixes

### Issues Fixed:
1. Layout Shift Issue:
   - Fixed sticky header alignment
   - Adjusted drag handle positioning
   - Ensured consistent cell padding
   - Fixed background colors for sticky columns

2. Sorting Behavior:
   - Fixed click event propagation
   - Separated sort and drag functionality
   - Improved sort state management
   - Added visual feedback for sort state

## 2025-01-27 15:53:49 HST - Sorting Behavior Fix

### Issues:
1. Sorting sometimes gets stuck or behaves unexpectedly
2. Interaction between drag and sort is not smooth
3. Sort state doesn't properly reset when changing columns

### Fixes:
1. Improved Sort Logic:
   - Separated sort and drag state completely
   - Added proper sort state reset
   - Fixed boolean value sorting
   - Improved sort priority handling

2. Click Handling:
   - Better click event management
   - Clear separation between drag and sort actions
   - Added debounce to prevent double triggers

3. Visual Feedback:
   - Clearer sort direction indicators
   - Better hover states for sortable columns
   - Improved active state visualization

## 2025-01-27 15:55:39 HST - Data Display and Sorting Fixes

### Issues:
1. Data Display Problems:
   - Some rows appear to be missing or cut off
   - Data not properly aligned in table
   - Inconsistent row rendering

2. Sorting Refinements:
   - Sorting still behaving inconsistently
   - Need to improve handling of mixed data types
   - Better handling of null/undefined/special values

### Solutions:
1. Data Display:
   - Fix data filtering logic
   - Ensure all services are properly rendered
   - Improve table cell alignment
   - Add proper row tracking

2. Sorting:
   - Simplify sort logic
   - Consistent handling of special values
   - Better type checking for values
   - Improved sort stability

## 2025-01-27 15:59:34 HST - Column Alignment Fix

### Issues:
1. Column Misalignment:
   - Headers not properly aligned with cells
   - Inconsistent column widths
   - Drag handles affecting layout

### Fixes:
1. Table Layout:
   - Fixed table cell spacing and borders
   - Improved sticky column behavior
   - Better handle positioning
   - Consistent column widths

2. CSS Improvements:
   - Removed border-spacing
   - Fixed cell padding calculations
   - Better handle alignment
   - Improved sticky column shadows

## 2025-01-28 12:40:07 HST - Column Layout Redesign

### New Approach:
1. Table Structure Changes:
   - Remove fixed table layout
   - Use CSS Grid for better column control
   - Implement proper column sizing
   - Better handling of cell content

2. Column Handling:
   - Dynamic column width calculation
   - Content-based sizing
   - Better overflow handling
   - Improved sticky behavior

3. Implementation Details:
   - Convert table to grid layout
   - Use auto-fit for columns
   - Better content wrapping
   - Improved mobile responsiveness

This new approach should provide better control over column widths and alignment while maintaining all existing functionality.

## 2025-01-28 12:47:37 HST - Table Structure Simplification

### Issues Identified:
1. Grid layout causing alignment problems
2. Inconsistent column widths
3. Data ordering issues
4. Complex CSS causing unintended interactions

### New Approach:
1. Back to Traditional Table:
   - Use standard HTML table elements
   - Fixed column widths
   - Simpler CSS structure
   - Better header alignment

2. Layout Changes:
   - Remove grid layout
   - Use table-layout: fixed
   - Explicit width calculations
   - Simplified sticky positioning

3. Styling Improvements:
   - Cleaner border handling
   - Better cell padding
   - More reliable sticky headers
   - Improved scroll behavior

This approach prioritizes reliability and consistency over the flexibility of CSS Grid.

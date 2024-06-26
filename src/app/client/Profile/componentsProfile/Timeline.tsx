// components/Timeline.tsx
import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import { Timeline } from "@mui/lab";
import { IconButton, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import React from 'react';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';


// Assuming entries is an array of objects with 'date' and 'event' properties
type Entry = {
  date: string;
  event: string;
};

type TimelineProps = {
  entries: Entry[];
};


const TimelineCard: React.FC<Entry & { index: number }> = ({ date, event, index }) => {
  const backgroundColor = index % 2 === 0 ? '#ffffff' : '#f4f9fd'; // alternating colors

  // Adjust the styles below as needed
  const cardStyle = {
    backgroundColor: backgroundColor,
    padding: '1px', // Reduce the size of the area
    //margin: 'auto', // Center the card if needed
  };

  const contentStyle = {
    py: '12px',
    px: 10,
    my: 0, // Adjust margins between items here
    //mx: 'auto', // Center the content if needed
  };

  return (
    <div style={cardStyle}>
      <TimelineItem>
        <TimelineOppositeContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            maxWidth: '180px',
            marginRight: '16px',
          }}
          color="text.secondary"
        >
          <Typography variant="body2">{date}</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot sx={{ boxShadow: 'none' }} />
          <TimelineConnector sx={{ my: 1 }} /> {/* Adjust the spacing */}
        </TimelineSeparator>
        <TimelineContent sx={contentStyle}>
          <Typography component="span">{event}</Typography>
        </TimelineContent>
      </TimelineItem>
    </div>
  );
};


const CustomTimeline: React.FC<TimelineProps> = ({ entries }) => {
  return (
    <div style={{ padding: '20px' }}> {/* Add padding to move away from the sidebar */}
      {/* Add a header with the title, avatar and edit icon */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt="Profile Picture" src="/path-to-your-image.jpg" sx={{ width: 56, height: 56, marginRight: '10px' }} />
          <Typography variant="h5" component="h1">Timeline</Typography>
        </div>
        <IconButton aria-label="edit">
          <EditIcon />
        </IconButton>
      </div>

      <Timeline className="relative border-l-2 border-gray-200">
        {entries.map((entry, index) => (
          <TimelineCard key={index} index={index} {...entry} />
        ))}
      </Timeline>
    </div>
  );
};

export default CustomTimeline;
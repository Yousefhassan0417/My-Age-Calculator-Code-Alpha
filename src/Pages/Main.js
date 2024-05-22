import React, { useState } from 'react';

function Main() {
  const [birthDay, setBirthDay] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [birthTimeHour, setBirthTimeHour] = useState('');
  const [birthTimeMinute, setBirthTimeMinute] = useState('');
  const [amPm, setAmPm] = useState('AM');
  const [timezone, setTimezone] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [age, setAge] = useState(null);

  const timezones = [
    { city: "UTC", offset: 0 },
    { city: "London, Europe", offset: 0 },
    { city: "Berlin, Europe", offset: 1 },
    { city: "Cairo, Africa", offset: 2 },
    { city: "Moscow, Europe", offset: 3 },
    { city: "Dubai, Asia", offset: 4 },
    { city: "Karachi, Asia", offset: 5 },
    { city: "New Delhi, Asia", offset: 5.5 },
    { city: "Dhaka, Asia", offset: 6 },
    { city: "Jakarta, Asia", offset: 7 },
    { city: "Beijing, Asia", offset: 8 },
    { city: "Tokyo, Asia", offset: 9 },
    { city: "Sydney, Australia", offset: 10 },
    { city: "Noumea, Oceania", offset: 11 },
    { city: "Auckland, Oceania", offset: 12 },
    { city: "Honolulu, USA", offset: -10 },
    { city: "Anchorage, USA", offset: -9 },
    { city: "Los Angeles, USA", offset: -8 },
    { city: "Denver, USA", offset: -7 },
    { city: "Chicago, USA", offset: -6 },
    { city: "New York, USA", offset: -5 },
    { city: "Caracas, South America", offset: -4 },
    { city: "Sao Paulo, South America", offset: -3 },
    { city: "Mid-Atlantic", offset: -2 },
    { city: "Azores, Atlantic", offset: -1 },
  ];

  const calculateAge = () => {
    const today = new Date();
    const userBirthDate = new Date(`${birthYear}-${birthMonth.padStart(2, '0')}-${birthDay.padStart(2, '0')}`);

    let birthHour = parseInt(birthTimeHour) || 0;
    const birthMinute = parseInt(birthTimeMinute) || 0;
    if (amPm === 'PM' && birthHour < 12) birthHour += 12;
    if (amPm === 'AM' && birthHour === 12) birthHour = 0;

    userBirthDate.setHours(birthHour);
    userBirthDate.setMinutes(birthMinute);

    const timezoneOffset = parseFloat(timezone) || 0;
    userBirthDate.setHours(userBirthDate.getHours() - timezoneOffset);

    const diff = today - userBirthDate;

    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * (365.25 / 12)));
    const days = Math.floor((diff % (1000 * 60 * 60 * 24 * (365.25 / 12))) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    setAge({ years, months, days, hours, minutes });
    setShowResults(true);
  };

  const calculateNextBirthday = () => {
    if (!age) return '';

    const today = new Date();
    const birthMonthNum = parseInt(birthMonth) - 1;
    const birthDayNum = parseInt(birthDay);
    const currentYear = today.getFullYear();
    const nextBirthday = new Date(currentYear, birthMonthNum, birthDayNum);

    if (today > nextBirthday) {
      nextBirthday.setFullYear(currentYear + 1);
    }

    const diff = nextBirthday - today;
    const months = Math.floor(diff / (1000 * 60 * 60 * 24 * (365.25 / 12)));
    const days = Math.floor((diff % (1000 * 60 * 60 * 24 * (365.25 / 12))) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${months} months ${days} days ${hours} hours and ${minutes} minutes`;
  };

  const formatBirthDateTime = () => {
    let hour = parseInt(birthTimeHour) || 0;
    const minute = (parseInt(birthTimeMinute) || 0).toString().padStart(2, '0');
    const period = amPm.toLowerCase();

    if (hour === 0) {
      hour = 12;
    } else if (hour > 12) {
      hour = hour - 12;
    }

    const formattedTime = `${hour}:${minute}${period}`;

    const userBirthDate = new Date(`${birthYear}-${birthMonth.padStart(2, '0')}-${birthDay.padStart(2, '0')}`);
    const dayOfWeek = userBirthDate.toLocaleDateString('en-US', { weekday: 'long' });
    const dayOfMonth = userBirthDate.getDate();
    const month = userBirthDate.toLocaleDateString('en-US', { month: 'long' });
    const year = userBirthDate.getFullYear();

    let daySuffix = 'th';
    if (dayOfMonth === 1 || dayOfMonth === 21 || dayOfMonth === 31) daySuffix = 'st';
    else if (dayOfMonth === 2 || dayOfMonth === 22) daySuffix = 'nd';
    else if (dayOfMonth === 3 || dayOfMonth === 23) daySuffix = 'rd';

    return `${formattedTime} on ${dayOfWeek} ${dayOfMonth}${daySuffix} ${month} ${year}`;
  };

  const generateOptions = (count, start = 1) => {
    return [...Array(count).keys()].map(i => (
      <option key={i+start} value={i+start}>{i+start}</option>
    ));
  };

  return (
    <div className='Age-Calculator1'>
      <h1>How Old am I Today? Age Calculator</h1>
      <hr />
      <form onSubmit={(e) => {
        e.preventDefault();
        calculateAge();
      }}>
        <label className='birthdate'>Birth Date (dd/mm/yyyy):</label>
        <div className='birthdate-input'>
          <select value={birthDay} onChange={(e) => setBirthDay(e.target.value)} required>
            <option value="">Days</option>
            {generateOptions(31)}
          </select>
          <select value={birthMonth} onChange={(e) => setBirthMonth(e.target.value)} required>
            <option value="">Months</option>
            {generateOptions(12)}
          </select>
          <select value={birthYear} onChange={(e) => setBirthYear(e.target.value)} required>
            <option value="">Years</option>
            {generateOptions(125, 1900)}
          </select>
        </div>
        <br />
        <label className='birthTimeHour'>Birth Time:</label>
        <div className="time-of-birth">
          <select id='birthTimeHour' value={birthTimeHour} onChange={(e) => setBirthTimeHour(e.target.value)} required>
            {[...Array(12).keys()].map(i => (
              <option key={i+1} value={i+1}>{i+1}</option>
            ))}
          </select>
          :
          <select id='birthTimeMinute' value={birthTimeMinute} onChange={(e) => setBirthTimeMinute(e.target.value)} required>
            {[...Array(60).keys()].map(i => (
              <option key={i} value={i.toString().padStart(2, '0')}>{i.toString().padStart(2, '0')}</option>
            ))}
          </select>
          <br />
          <div className='am-pm-radio'>
            <input type='radio' id='am' name='ampm' value='AM' checked={amPm === 'AM'} onChange={(e) => setAmPm(e.target.value)} required />
            <label className='am'>AM</label>
            <input type='radio' id='pm' name='ampm' value='PM' checked={amPm === 'PM'} onChange={(e) => setAmPm(e.target.value)} required />
            <label className='pm'>PM</label>
          </div>
        </div>
        <br />
        <label className='timezone'>Timezone Offset (in hours):</label>
        <select id='timezone' value={timezone} onChange={(e) => setTimezone(e.target.value)} required>
          {timezones.map((tz, index) => (
            <option key={index} value={tz.offset}>{tz.city} (UTC{tz.offset >= 0 ? '+' : ''}{tz.offset})</option>
          ))}
        </select>
        <br />
        <button className='button' type='submit'>Calculate Age</button>
      </form>
      {showResults && age && (
        <div className='results'>
          <h2>Your Age:</h2>
          <p>{age.years} years, {age.months} months, {age.days} days, {age.hours} hours, and {age.minutes} minutes old.</p>
          <h2>Next Birthday:</h2>
          <p>{calculateNextBirthday()}</p>
          <h2>Birth Date and Time:</h2>
          <p>{formatBirthDateTime()}</p>
          <h2>Age in Days:</h2>
          <p>{((age.years * 365) + (age.months * 30) + age.days)} days old</p>
        </div>
      )}
    </div>
  );
}

export default Main;











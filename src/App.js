import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardActionArea from '@mui/material/CardActionArea'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useState, useEffect } from 'react'
import { Button } from '@mui/material'

const Test = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [teamName, setTeamName] = useState(null)
  const [selectedAmount, setSelectedAmount] = useState(0)
  const [indiaData, setIndiaData] = useState([])
  const [englandData, setEnglandData] = useState([])

  // State for totals
  const [totalIndiaAmount, setTotalIndiaAmount] = useState(0)
  const [totalIndiaWinning, setTotalIndiaWinning] = useState(0)
  const [totalEnglandAmount, setTotalEnglandAmount] = useState(0)
  const [totalEnglandWinning, setTotalEnglandWinning] = useState(0)

  const open = Boolean(anchorEl)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setTeamName(null)
  }

  const addEntry = () => {
    if (teamName === 'India') {
      setIndiaData(prevData => [
        ...prevData,
        { name: 'India', point: 1.5, amount: selectedAmount },
      ])
    } else {
      setEnglandData(prevData => [
        ...prevData,
        { name: 'England', point: 2.5, amount: selectedAmount },
      ])
    }
    handleClose()
  }

  // Calculate totals whenever indiaData or englandData changes
  useEffect(() => {
    const totalAmountIndia = indiaData.reduce((acc, item) => acc + item.amount, 0)
    const totalWinningIndia = indiaData.reduce((acc, item) => acc + item.amount * item.point, 0)
    setTotalIndiaAmount(totalAmountIndia)
    setTotalIndiaWinning(totalWinningIndia)

    const totalAmountEngland = englandData.reduce((acc, item) => acc + item.amount, 0)
    const totalWinningEngland = englandData.reduce((acc, item) => acc + item.amount * item.point, 0)
    setTotalEnglandAmount(totalAmountEngland)
    setTotalEnglandWinning(totalWinningEngland)
  }, [indiaData, englandData])

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Card
          onClick={e => {
            handleClick(e)
            setTeamName('India')
          }}
        >
          <CardActionArea sx={{ height: '100%' }}>
            <CardContent sx={{ height: '100%' }}>
              <Typography variant="h5">India</Typography>
              <Typography variant="body2" color="text.secondary">
                1.5
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card
          onClick={e => {
            handleClick(e)
            setTeamName('England')
          }}
        >
          <CardActionArea sx={{ height: '100%' }}>
            <CardContent sx={{ height: '100%' }}>
              <Typography variant="h5">England</Typography>
              <Typography variant="body2" color="text.secondary">
                2.5
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '50px' }}>
        {/* India Table */}
        <table border="1">
          <thead>
            <tr>
              <th>Team name</th>
              <th>Point</th>
              <th>Amount</th>
              <th>Winning amount</th>
            </tr>
          </thead>
          <tbody>
            {indiaData.map((data, index) => (
              <tr key={index}>
                <td>{data.name}</td>
                <td>{data.point}</td>
                <td>{data.amount}$</td>
                <td>{(data.amount * data.point).toFixed(2)}$</td>
              </tr>
            ))}
            {/* Total Row */}
            <tr style={{ fontWeight: 'bold', background: '#f0f0f0' }}>
              <td colSpan="2">Total</td>
              <td>{totalIndiaAmount}$</td>
              <td>{totalIndiaWinning.toFixed(2)}$</td>
            </tr>
          </tbody>
        </table>

        {/* England Table */}
        <table border="1">
          <thead>
            <tr>
              <th>Team name</th>
              <th>Point</th>
              <th>Amount</th>
              <th>Winning amount</th>
            </tr>
          </thead>
          <tbody>
            {englandData.map((data, index) => (
              <tr key={index}>
                <td>{data.name}</td>
                <td>{data.point}</td>
                <td>{data.amount}$</td>
                <td>{(data.amount * data.point).toFixed(2)}$</td>
              </tr>
            ))}
            {/* Total Row */}
            <tr style={{ fontWeight: 'bold', background: '#f0f0f0' }}>
              <td colSpan="2">Total</td>
              <td>{totalEnglandAmount}$</td>
              <td>{totalEnglandWinning.toFixed(2)}$</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Betting Amount Selection */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Box sx={{ width: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'center', p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">{selectedAmount}$</Typography>
            <Button onClick={addEntry}>Submit</Button>
          </Box>
          <table border="1">
            <tbody>
              {[1000, 2000, 3000, 4000, 5000, 6000].map((amount, index) => (
                index % 3 === 0 ? (
                  <tr key={index}>
                    {[amount, amount + 1000, amount + 2000].map((amt, idx) => (
                      <td key={idx} onClick={() => setSelectedAmount(amt)} style={{ padding: '8px', cursor: 'pointer' }}>
                        {amt}
                      </td>
                    ))}
                  </tr>
                ) : null
              ))}
            </tbody>
          </table>
        </Box>
      </Menu>
    </div>
  )
}

export default Test

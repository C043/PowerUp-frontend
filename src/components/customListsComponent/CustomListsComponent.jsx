import { useEffect, useState } from "react"
import { Button, Col, Row } from "react-bootstrap"
import SingleCustomList from "../singleCustomList/SingleCustomList"

const CustomListsComponent = () => {
  const [customLists, setCustomLists] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  const token = localStorage.getItem("token")

  const fetchCustomLists = async () => {
    setIsLoaded(false)
    try {
      const resp = await fetch("http://localhost:3001/customLists/me", {
        headers: {
          "Authorization": "Bearer " + token
        }
      })
      const data = await resp.json()
      if (resp.ok) {
        setCustomLists(data)
      } else throw new Error(data.message)
    } catch (error) {
      console.log(error.message)
    } finally {
      setIsLoaded(true)
    }
  }

  useEffect(() => {
    fetchCustomLists()
  }, [])

  return <div className="mt-5">
    <p className="h2">Custom Lists</p>
    {customLists.length === 0 && isLoaded &&
      <>
        <p>No Custom Lists here, add one!</p>
        <Button className="rounded rounded-pill">Add Custom List</Button>
      </>
    }
    <Row className="w-100 mt-3 g-2">
      {customLists.map(list => {
        return <Col xs="12" md="6" lg="3" key={list.id}>
          <SingleCustomList title={list.title} listId={list.id} />
        </Col>
      })}
    </Row>
  </div>
}

export default CustomListsComponent

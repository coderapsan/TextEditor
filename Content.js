import { useState, useRef } from "react";
import { Modal, Input, List } from "antd";
const { TextArea } = Input;

const Content = () => {
  const contentRef = useRef(null);
  const [selectedText, setSelectedText] = useState("");
  const [isCommentModalVisible, setCommentModalVisible] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  const handleSelection = () => {
    const selection = window.getSelection();
    if (selection.toString().trim() !== "") {
      setSelectedText(selection.toString());
      setCommentModalVisible(true);
    }
  };

  const handleCommentModalOk = () => {
    const newComment = { selectedText, commentText };
    setComments([...comments, newComment]);
    setCommentModalVisible(false);
    setSelectedText("");
    setCommentText("");
  };

  const handleCommentModalCancel = () => {
    setCommentModalVisible(false);
    setSelectedText("");
    setCommentText("");
  };

 const handleCommentClick = (selectedText) => {
  setSelectedText(selectedText);
  const selection = window.getSelection();
  const range = document.createRange();
  const contentNode = contentRef.current;

  let textContent = contentNode.textContent;
  let startIndex = textContent.indexOf(selectedText);
  let endIndex = startIndex + selectedText.length;

  range.setStart(contentNode.firstChild, startIndex);
  range.setEnd(contentNode.firstChild, endIndex);
  selection.removeAllRanges();
  selection.addRange(range);
};


  return (
    <div>
      <h1 className="title" contentEditable="true" onMouseUp={handleSelection} ref={contentRef}>
        Nepal
      </h1>
      <p contentEditable="true" onMouseUp={handleSelection} ref={contentRef}>
        Nepal is a beautiful country located in South Asia. It is known for its stunning landscapes, including the majestic Himalayas and Mount Everest, the highest peak in the world. Nepal is rich in cultural heritage and is home to diverse ethnic groups, each with its own traditions, languages, and customs. The country offers a wide range of experiences for travelers, from exploring ancient temples and historical sites to trekking in the breathtaking Himalayan trails. The warm hospitality of the Nepalese people adds to the charm of this enchanting nation. Whether you are an adventure seeker, a nature lover, or a cultural enthusiast, Nepal has something to offer for everyone.
      </p>

      <Modal
        title="Add Comment"
        visible={isCommentModalVisible}
        onOk={handleCommentModalOk}
        onCancel={handleCommentModalCancel}
      >
        <TextArea
          rows={4}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Enter your comment"
        />
      </Modal>

      <List
        header={<h2>Comments</h2>}
        dataSource={comments}
        renderItem={(item) => (
          <List.Item onClick={() => handleCommentClick(item.selectedText)}>
            <p className="selectedText">{item.selectedText}</p>
            <p className="commentText"><b>{item.commentText}</b></p>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Content;

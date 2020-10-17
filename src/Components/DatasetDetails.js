import React from "react";
import data from "../data/datasets.json";
import "./DatasetDetails.scss";
import { CodeIcon } from "../assets/icons";
import { CheckIcon } from "../assets/icons";
import { CrossIcon } from "../assets/icons";
import UrlBuilder from "./UrlBuilder";
import PlotBuilder from "./PlotBuilder";
import ReactHtmlParser from "react-html-parser";

class DatasetDetails extends React.Component {
  constructor(props) {
    super(props);
    this.datasetId = props.match.params.id;
    this.dataset = data.datasets.find((ds) => ds.id === this.datasetId);
    this.urlBuilder = new UrlBuilder();
  }

  renderModel(model) {
    return (
      <tr>
        <td>{model.model}</td>
        {this.dataset.metrics.map((m) => {
          return <td>{model.results[m]}</td>;
        })}
        <td className="td-extra-training-data">
          {model.extra_training_data ? <CheckIcon /> : <CrossIcon />}
        </td>
        <td>{model.model_size}</td>
        <td>
          <a href={model.paper_link} target="_blank" rel="noopener noreferrer">
            {model.paper_title}
          </a>
        </td>
        <td>
          {model.source_link && (
            <a
              href={model.source_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <CodeIcon />
            </a>
          )}
        </td>
        <td>{model.submission_date}</td>
      </tr>
    );
  }

  renderModels() {
    return (
      <table className="table dataset-details">
        <thead>
          <tr>
            <td>Model</td>
            {this.dataset.metrics.map((m) => (
              <td>{m}</td>
            ))}
            <td>Extra training data</td>
            <td>Model size</td>
            <td>Paper</td>
            <td>Code</td>
            <td>Submitted</td>
          </tr>
        </thead>
        <tbody>{this.dataset.models.map((m) => this.renderModel(m))}</tbody>
      </table>
    );
  }

  render() {
    return (
      <>
        <h3 className="dataset-title">{this.dataset.dataset_name}</h3>
        <div className="dataset-description">
          {ReactHtmlParser(this.dataset.dataset_description)}
        </div>
        <table className="dataset-info">
          <tbody>
            <tr>
              <th>Source</th>
              <td>
                <a
                  href={this.dataset.dataset_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {this.dataset.dataset_link}
                </a>
              </td>
            </tr>
            <tr>
              <th>License</th>
              <td>
                {this.dataset.license_url ? (
                  <a
                    href={this.dataset.license_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {this.dataset.license}
                  </a>
                ) : (
                  this.dataset.license
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <PlotBuilder dataset={this.dataset} />
        {this.renderModels()}
      </>
    );
  }
}

export default DatasetDetails;

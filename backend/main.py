from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

class PipelineData(BaseModel):
    nodes: int 
    edges: int 
    isDAG: bool

@app.post('/pipelines/parse')
async def parse_pipeline(pipeline: PipelineData):
    # returning response
    return {
        "num_nodes": pipeline.nodes,
        "num_edges": pipeline.edges,
        "is_dag": pipeline.isDAG
    }

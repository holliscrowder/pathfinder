"""add goal topic

Revision ID: 0eaf2d4da7b0
Revises: 565ec2719fc8
Create Date: 2024-08-24 16:13:00.273143

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0eaf2d4da7b0'
down_revision = '565ec2719fc8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('goals', schema=None) as batch_op:
        batch_op.add_column(sa.Column('topic', sa.String(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('goals', schema=None) as batch_op:
        batch_op.drop_column('topic')

    # ### end Alembic commands ###

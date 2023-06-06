"""create tables

Revision ID: 748ed1b61bbf
Revises: 7a7b0752a72c
Create Date: 2023-06-05 13:56:41.093846

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '748ed1b61bbf'
down_revision = '7a7b0752a72c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('email', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('email')

    # ### end Alembic commands ###
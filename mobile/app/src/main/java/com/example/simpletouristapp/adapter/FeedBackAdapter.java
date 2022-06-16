package com.example.simpletouristapp.adapter;

import android.content.Context;
import android.content.DialogInterface;
import android.content.SharedPreferences;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.RatingBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.simpletouristapp.R;
import com.example.simpletouristapp.model.FeedBackResponse;
import com.example.simpletouristapp.service.FeedBacksApiService;
import com.google.android.material.dialog.MaterialAlertDialogBuilder;
import com.google.android.material.imageview.ShapeableImageView;
import com.google.android.material.textfield.TextInputEditText;
import com.google.android.material.textfield.TextInputLayout;
import com.squareup.picasso.Picasso;

import java.util.List;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class FeedBackAdapter extends RecyclerView.Adapter<FeedBackAdapter.FeedBackViewHolder> {

    private Context context;
    private List<FeedBackResponse.FeedBack> feedBacks;
    private SharedPreferences sharedPref;
    private FeedBacksApiService feedBacksApiService;
    private MaterialAlertDialogBuilder builder;

    public FeedBackAdapter(Context context, List<FeedBackResponse.FeedBack> feedBacks) {
        this.context = context;
        this.feedBacks = feedBacks;
        sharedPref = context.getSharedPreferences("Token",Context.MODE_PRIVATE);
        feedBacksApiService = new FeedBacksApiService();
        builder = new MaterialAlertDialogBuilder(this.context);
    }

    public Context getContext() {
        return context;
    }

    public void setContext(Context context) {
        this.context = context;
    }

    public List<FeedBackResponse.FeedBack> getFeedBacks() {
        return feedBacks;
    }

    public void setFeedBacks(List<FeedBackResponse.FeedBack> feedBacks) {
        this.feedBacks = feedBacks;
    }

    @NonNull
    @Override
    public FeedBackViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(parent.getContext());
        View view = inflater.inflate(R.layout.item_comment, parent, false);
        return new FeedBackViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull FeedBackViewHolder holder, int position) {
        FeedBackResponse.FeedBack feedBack = feedBacks.get(position);

        holder.tvName.setText(feedBack.getCustomer().getGivenName() + " " + feedBack.getCustomer().getFamilyName());
        holder.rating.setRating(feedBack.getRating());
        holder.comment.setText(feedBack.getComment());
        Picasso.get().load(feedBack.getCustomer().getPhotoUrl()).into(holder.imageAvatar);
        if(sharedPref.getString("id_customer","").equals(feedBack.getCustomer().getId())){
            holder.btnDelete.setVisibility(View.VISIBLE);
        }
        holder.btnDelete.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Call<ResponseBody> call = feedBacksApiService.deleteFeedback("Bearer " + sharedPref.getString("access_token",""),feedBack.getId());
                call.enqueue(new Callback<ResponseBody>() {
                    @Override
                    public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                        if(response.code() == 204){
                            builder.setTitle("Xóa thành công");
                            builder.setPositiveButton(R.string.accept, new DialogInterface.OnClickListener() {
                                @Override
                                public void onClick(DialogInterface dialogInterface, int i) {
                                    dialogInterface.dismiss();
                                    holder.itemView.setVisibility(View.GONE);
                                }
                            });
                            builder.show();
                        }else {
                            Log.d("Delete", String.valueOf(response.code()));
                            builder.setTitle("Xóa thất bại");
                            builder.setPositiveButton(R.string.accept, new DialogInterface.OnClickListener() {
                                @Override
                                public void onClick(DialogInterface dialogInterface, int i) {
                                    dialogInterface.dismiss();

                                }
                            });
                            builder.show();
                        }
                    }

                    @Override
                    public void onFailure(Call<ResponseBody> call, Throwable t) {
                        Toast.makeText(getContext(), t.getMessage(), Toast.LENGTH_SHORT).show();
                        builder.setTitle("Xóa thất bại");
                        builder.setPositiveButton(R.string.accept, new DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(DialogInterface dialogInterface, int i) {
                                dialogInterface.dismiss();
                            }
                        });
                        builder.show();
                    }
                });
            }
        });
    }

    @Override
    public int getItemCount() {
        return feedBacks.size();
    }

    public class FeedBackViewHolder extends RecyclerView.ViewHolder{
        private ShapeableImageView imageAvatar;
        private TextView tvName;
        private RatingBar rating;
        private TextView comment;
        private ImageButton btnDelete;
        public FeedBackViewHolder(@NonNull View itemView) {
            super(itemView);
            tvName = itemView.findViewById(R.id.txt_email_account);
            rating = itemView.findViewById(R.id.rating_feedback);
            comment = itemView.findViewById(R.id.txt_cmt_account);
            btnDelete = itemView.findViewById(R.id.btn_delete);
            imageAvatar = itemView.findViewById(R.id.image_avatar);
        }
    }
}
